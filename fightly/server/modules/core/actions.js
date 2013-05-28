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
        "joinGame": {
            "check": function(game, player) {
                return game.players.length < game.maxNumberOfPlayers;
            },
            "execute": function(game, player) {
                game.players.push(player);
                player.inGame = game;
            }
        },
        "nextTurn": {
            "check": function(game, player) {
                return game.isPlayerActive(player);
            },
            "execute": function(game, player) {
                game.currentTurn += 1;
                game.activePlayer = game.players[game.currentTurn % game.players.length];
            }
        },
    };

    return {
        'actions': actions
    };
});
