/* ****************************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 *****************************************************************************/

var util = require('util');
var fs = require('fs');
var path = require('path');
var events = require('events');

var cem = require('../../vendor/component-entity/component-entity-manager');
var am = require('../../vendor/action-manager/action-manager');

var Game = require('./game');

/**
 * Class GameEngine
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 * @constructor
 */
function GameEngine(config) {
    cem.ComponentEntityManager.call(this);
    am.ActionManager.call(this);
    events.EventEmitter.call(this);

    this.config = config;
    this.games = {};

    // As every new Game object needs to be passed the actions and components,
    // we cache them in those variables to avoid reloading them from files.
    this.rawActions = {};
    this.rawComponents = {};
}

util.inherits(GameEngine, cem.ComponentEntityManager);
util.inherits(GameEngine, am.ActionManager);
util.inherits(GameEngine, events.EventEmitter);

/**
 * Initialize the GameEngine. Load core and modules. Start the network.
 *
 * @return this.
 */
GameEngine.prototype.init = function() {
    var pathToModules = this.config.modules.directory;
    var modules;

    // initialize the GameEngine

    // Load modules' actions and components
    modules = this._getModulesList(pathToModules);
    this._loadModulesComponents(modules);
    this._loadModulesActions(modules);

    // Listen to events
    this._initEventsListeners();

    return this;
};

/**
 * Create bindings for all events the game engine can handle.
 *
 * @return this.
 */
GameEngine.prototype._initEventsListeners = function() {
    // Execute an action
    this.on('actionReceive', (data) => {
        var client = data.client;
        var module = data.action.module;
        var action = data.action.name;
        var params = data.action.args;
        var args = [];

        if (module === 'core' && action === 'createGame') {
            // This is a special case handled by this game engine, as only
            // the game engine can create a new game.
            this.createGame(client);
        }
        else if (module === 'core' && action === 'joinGame') {
            // This is a special case handled by this game engine
            this.joinGame(params[0], client);
        }
        else {
            var game = this.games[params[0]];

            // The first parameter is the game itself.
            for (var i = 1, ln = params.length; i < ln; i++) {
                args.push(game.get(params[i]));
            }

            game.actions.actions[module][action].apply(null, args);
        }
    });

    this.on('dataReceive', (message) => {
        var data = message.data;
        var client = message.client;

        if (data === 'modules') {
            // The client is asking for the list of all modules
            client.send({
                'modules': this.getModules()
            });
        }
        else if (data === 'games') {
            // The client is asking for the list of all existing games
            var games = [];
            for (var g in this.games) {
                games.push(this.games[g]);
            }

            client.send({
                'games': games
            });
        }
    });
    return this;
};

/**
 * Load and register all modules' actions into this GameEngine.
 *
 * @param modules Array, list of all module directories.
 * @return this.
 */
GameEngine.prototype._loadModulesActions = function(modules) {
    var actionsFilePath;
    var actionsFile;
    var module;

    for (m in modules) {
        module = modules[m].split('/');
        module = module[module.length - 1];
        actionsFilePath = path.join(modules[m], 'actions.js');
        if (fs.existsSync(actionsFilePath)) {
            actionsFile = require('../' + actionsFilePath); // Sad hack...
            this.addActions(module, actionsFile.actions);
            // Caching
            this.rawActions[module] = actionsFile.actions;
        }
    }
    return this;
};

/**
 * Load and register all modules' components into this GameEngine.
 *
 * @param modules Array, list of all module directories.
 * @return this.
 */
GameEngine.prototype._loadModulesComponents = function(modules) {
    var module;
    var files;
    var file;
    var pathToFile;
    var stat;
    var component;
    var c;

    for (m in modules) {
        module = modules[m];

        // List all files in this directory
        files = fs.readdirSync(module);
        files.sort();
        for (f in files) {
            file = files[f];
            pathToFile = path.join(module, file);
            stat = fs.statSync(pathToFile);

            if (
                stat.isFile() &&
                file.lastIndexOf('.js') === file.length - 3 &&
                file !== 'actions.js'
            ) {
                // It's a component file, let's load it
                components = require('../' + pathToFile); // Node.js sad hack
                for (c in components) {
                    // Add this component to the GameEngine
                    this.c(c, components[c]);

                    // Caching
                    this.rawComponents[c] = components[c];
                }
            }
        }
    }

    return this;
};

/**
 * Return a list of all module directories in pathToModules. Return an
 * empty list if pathToModules does not exist.
 *
 * @param pathToModules String, directory where all the modules live.
 * @return A list of paths to module folders, or an empty list.
 */
GameEngine.prototype._getModulesList = function(pathToModules) {
    var modules = [];

    pathToModules = path.normalize(pathToModules);
    if (!fs.existsSync(pathToModules)) {
        util.error(util.format(
            "The modules directory '%s' doesn't exist",
            pathToModules
        ));
        return [];
    }

    var modulesList = fs.readdirSync(pathToModules);
    modulesList.sort();
    for (var m in modulesList) {
        var module = modulesList[m];
        var modulePath = path.join(pathToModules, module);
        var stats = fs.statSync(modulePath);
        if (stats.isDirectory() && module !== 'node_modules') {
            modules.push(modulePath);
        }
    }

    return modules;
};

/**
 * Return a dictionary of all modules and their files.
 *
 * @return A dictionary with keys being module names and values being a list of
 * files in that module.
 */
GameEngine.prototype.getModules = function() {
    var pathToModules = this.config.modules.directory;
    var modules = {};

    modulesList = this._getModulesList(pathToModules);
    for (m in modulesList) {
        var module = path.basename(modulesList[m]);
        var pathToModule = modulesList[m];
        var filesInModule = [];

        files = fs.readdirSync(pathToModule);
        files.sort();
        for (f in files) {
            var file = files[f];
            var pathToFile = path.join(pathToModule, file);
            stat = fs.statSync(pathToFile);

            if (stat.isFile() && file.lastIndexOf('.js') === file.length - 3) {
                // Add this file to the list of files in the current module
                filesInModule.push(file)
            }
        }

        modules[module] = filesInModule;
    }

    return modules;
};

/**
 * Return a new Game instance after adding it to the list of games.
 *
 * @return object A Game entity.
 */
GameEngine.prototype.createGame = function(client) {
    // Create the new game
    var newId = this.UID();
    var newGame = new Game(newId);
    this.games[newId] = newGame;

    // Copy actions and components
    for (var a in this.rawActions) {
        newGame.actions.addActions(a, this.rawActions[a]);
    }
    for (var c in this.rawComponents) {
        newGame.manager.addComponent(c, this.rawComponents[c]);
    };

    return this.joinGame(newId, client);
};

/**
 * Add a player to an existing game.
 *
 * @return object A Game entity.
 */
GameEngine.prototype.joinGame = function(gameId, client) {
    var game = this.games[gameId];

    // Create a new player associated to the current client
    var playerEntity = game.manager.createEntity(['Player']);
    game.addClient(playerEntity, client);

    client.send({identity: playerEntity});
    return game;
};

module.exports = GameEngine;
