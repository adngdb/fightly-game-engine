/* ****************************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 * ***************************************************************************/

var util = require('util');

(function(exports) {

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

    exports.actions = actions;

})(typeof exports === 'undefined' ? this['exports'] = {} : exports);
