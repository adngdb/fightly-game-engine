/* ****************************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 * ***************************************************************************/

var util = require('util');

/**
 * Game component.
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 * @constructor
 */
var Game = {
    'currentTurn': 0,
    'maxNumberOfTurns': 100,

    'players': [],
    'maxNumberOfPlayers': 2,
    'activePlayer': null,

    'state': 'waiting',

    'isPlayerActive': function(player) {
        return player.id === this.activePlayer.id;
    },

    'isGameOver': function() {
        return this.currentTurn >= this.maxNumberOfTurns;
    },
};

exports.Game = Game;
