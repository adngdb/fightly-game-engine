/* ****************************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 *****************************************************************************/

var util = require('util')
    , fs = require('fs')
    , path = require('path')
    , events = require('events')
    ;

var cem = require('../../vendor/component-entity/component-entity-manager')
    , am = require('../../vendor/action-manager/action-manager')
    ;

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
    this.games = [];
};

util.inherits(GameEngine, cem.ComponentEntityManager);
util.inherits(GameEngine, am.ActionManager);
util.inherits(GameEngine, events.EventEmitter);

/**
 * Initialize the GameEngine. Load core and modules. Start the network.
 *
 * @return this.
 */
GameEngine.prototype.init = function() {
    var pathToModules = this.config.modules.directory
        , modules;

    // initialize the GameEngine

    // Load modules' actions and components
    modules = this._getModulesList(pathToModules);
    this._loadModulesComponents(modules)._loadModulesActions(modules);

    // Listen to events
    this._initEventsListeners();

    return this;
};

/**
 * Load and register all modules' actions into this GameEngine.
 *
 * @param modules Array, list of all module directories.
 * @return this.
 */
GameEngine.prototype._loadModulesActions = function(modules) {
    var actionsFilePath
        , actionsFile,
        module;

    for (m in modules) {
        module = modules[m].split('/');
        module = module[module.length - 1];
        actionsFilePath = path.join(modules[m], 'actions.js');
        if (fs.existsSync(actionsFilePath)) {
            actionsFile = require('../' + actionsFilePath); // Sad hack...
            this.addActions(module, actionsFile.actions);
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
                    util.log('Added component ' + c + ' to GameEngine');
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
    var modules;

    pathToModules = path.normalize(pathToModules);
    if (!fs.existsSync(pathToModules)) {
        util.error(util.format(
            "The modules directory '%s' doesn't exist",
            pathToModules
        ));
        return [];
    }

    modules = fs.readdirSync(pathToModules);
    modules.sort();
    for (m in modules) {
        modules[m] = path.join(pathToModules, modules[m]);
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

    pathToModules = path.normalize(pathToModules);
    if (!fs.existsSync(pathToModules)) {
        util.error(util.format(
            "The modules directory '%s' doesn't exist",
            pathToModules
        ));
        return [];
    }

    modulesList = fs.readdirSync(pathToModules);
    modulesList.sort();
    for (m in modulesList) {
        var module = modulesList[m];
        var pathToModule = path.join(pathToModules, module);
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

        modules[modulesList[m]] = filesInModule;
    }

    return modules;
};

/**
 * Create bindings for all events the game engine can handle.
 *
 * @return this.
 */
GameEngine.prototype._initEventsListeners = function() {
    // Execute an action
    this.on('actionReceive', function(data) {
        var client = data.client,
            module = data.action.module,
            action = data.action.name,
            params = data.action.args,
            args = [];

        for (var e in params) {
            args.push(this.get(params[e]));
        }

        this.actions[module][action].apply(null, args);
    }.bind(this));

    this.on('dataReceive', function (message) {
        util.log('GameEngine received data request: ' + message);
        var data = message.data,
            client = message.client;

        if (data === 'modules') {
            // The client is asking for the list of all modules
            client.send({
                'modules': this.getModules()
            });
        }
    });
    return this;
};

/**
 * Return a new Game instance after adding it to the list of games.
 *
 * @return object A Game entity.
 */
GameEngine.prototype.createGame = function() {
    var newGame = this.e('Game');
    this.games[newGame.id] = newGame;
    return newGame;
};

module.exports = GameEngine;
