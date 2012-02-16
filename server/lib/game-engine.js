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
function GameEngine() {
    cem.ComponentEntityManager.call(this);
    am.ActionManager.call(this);
};

util.inherits(GameEngine, cem.ComponentEntityManager);
util.inherits(GameEngine, am.ActionManager);

GameEngine.prototype = {

    init: function() {
        // initialize the GameEngine
        // Load all modules
        // Load the list of actions
        // Load all components
        // Start network
        // Listen to events
    },

    _loadComponents: function() {},
    _loadCoreComponents: function() {
        var game = require('./core/game.js');
    },

    /**
     * Load and register all modules' components into this GameEngine.
     *
     * @param pathToModules String, directory where all the modules live.
     * @return this.
     */
    _loadModulesComponents: function(pathToModules) {
        var modules = this._getModulesList(pathToModules)
            , module
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
                    }
                }
            }
        }

        return this;
    },

    /**
     * Return a list of all module directories in pathToModules. Return an
     * empty list if pathToModules does not exist.
     *
     * @param pathToModules String, directory where all the modules live.
     * @return A list of paths to module folders, or an empty list.
     */
    _getModulesList: function(pathToModules) {
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
    },

    createGame: function() {
    },

};

module.exports = GameEngine;
