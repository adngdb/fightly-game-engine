/* ****************************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 *****************************************************************************/

var util = require('util');
var events = require('events');

var cem = require('../../vendor/component-entity/component-entity-manager');
var am = require('../../vendor/action-manager/action-manager');

/**
 * Class Game
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 * @constructor
 */
function Game(id) {
    this.id = id;
    this.players = [];

    cem.ComponentEntityManager.call(this);
    am.ActionManager.call(this);
    events.EventEmitter.call(this);
}

util.inherits(Game, cem.ComponentEntityManager);
util.inherits(Game, am.ActionManager);
util.inherits(Game, events.EventEmitter);

Game.prototype.addPlayer = function (player) {
    this.players.push(player);
};

Game.prototype.toJSON = function () {
    return {
        'id': this.id,
        'players': this.players.length,
    };
};

module.exports = Game;
