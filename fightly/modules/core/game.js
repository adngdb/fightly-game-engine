/* ****************************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 * ***************************************************************************/

// for compatibility with node.js and require.js
if (typeof define !== 'function') {
    // this file is imported from the server
    var define = require('amdefine')(module)
}

define(function () {
    /**
     * Game component.
     *
     * @author Adrian Gaudebert - adrian@gaudebert.fr
     * @constructor
     */
    var Game = {
        currentTurn: 0,
        maxNumberOfTurns: 100,

        players: [],
        maxNumberOfPlayers: 2,
        activePlayer: null,

        state: 'waiting',

        isPlayerActive: function(player) {
            return player.id === this.activePlayer.id;
        },

        isGameOver: function() {
            return this.currentTurn >= this.maxNumberOfTurns;
        },
    };

    return {
        'Game': Game
    };
});
