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

var cem = require('../vendor/component-entity/component-entity-manager')
    , am = require('../vendor/action-manager/action-manager')
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


    // Load core actions and components
    this._loadCoreComponents()._loadCoreActions();

    // Load modules' actions and components
    modules = this._getModulesList(pathToModules);
    this._loadModulesComponents(modules)._loadModulesActions(modules);

    // Listen to events
    this._initEventsListeners();

    return this;
};

/**
 * Load and register all core actions into this GameEngine.
 *
 * @return this.
 */
GameEngine.prototype._loadCoreActions = function() {
    var actions = require('./core/actions.js');
    this.addActions('core', actions.actions);
    return this;
};

/**
 * Load and register all core components into this GameEngine.
 *
 * @return this.
 */
GameEngine.prototype._loadCoreComponents = function() {
    // Game
    var game = require('./core/game.js');
    this.c('Game', game.Game);
    util.log('Added Core component Game to GameEngine');

    // Player
    var player = require('./core/player.js');
    this.c('Player', player.Player);
    util.log('Added Core component Player to GameEngine');

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
        if (path.existsSync(actionsFilePath)) {
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
    var module
        , files
        , pathToFile
        , stat
        , component
        ;

    for (m in modules) {
        module = modules[m];

        // List all files in this directory
        files = fs.readdirSync(module);
        files.sort();
        for (f in files) {
            file = files[f];
            pathToFile = path.join(module, file);
            stat = fs.statSync(pathToFile);

            if (stat.isFile() && file.lastIndexOf('.js') === file.length - 3 && file !== 'actions.js') {
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
    if (!path.existsSync(pathToModules)) {
        util.debug("The modules directory '" + pathToModules + "' doesn't exist");
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
 * Create bindings for all events the game engine can handle.
 *
 * @return this.
 */
GameEngine.prototype._initEventsListeners = function() {
    // Execute an action
    this.on('actionReceived', function(data) {
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
