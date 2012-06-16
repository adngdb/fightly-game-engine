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
        "nextTurn": {
            "check": function(game) {
                return true;
            },
            "execute": function(game) {
                game.currentTurn += 1;
            }
        },
    };

    exports.actions = actions;

})(typeof exports === 'undefined' ? this['exports'] = {} : exports);
