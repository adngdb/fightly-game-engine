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
    var define = require('amdefine')(module)
}

define(function () {
    var actions = {
        createGame: {
            check: function() {
                return true;
            },
            execute: function() {
                // This is a special action handled by the game engine.
            }
        },
        joinGame: {
            check: function(game) {
                return true;
            },
            execute: function(game) {
                // This is a special action handled by the game engine.
            }
        },
        nextTurn: {
            check: function(player) {
                return player.game.isPlayerActive(player);
            },
            execute: function(player) {
                var game = player.game;
                game.currentTurn += 1;
                game.activePlayer = game.players[game.currentTurn % game.players.length];
            }
        },
    };

    return {
        'actions': actions
    };
});
