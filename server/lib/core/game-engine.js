/* ****************************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 *****************************************************************************/

var util = require('util');

var cem = require('../../vendor/component-entity/component-entity-manager'),
    am = require('../../vendor/action-manager/action-manager');

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

    createGame: function() {
    },

};

module.exports = GameEngine;
