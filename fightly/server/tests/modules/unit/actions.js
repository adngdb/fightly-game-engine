/* ****************************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 * ***************************************************************************/

(function(exports) {

    var actions = {
        "move": {
            "check": function(unit, dest) {
                return unit.canMove() && unit.canGoTo(dest);
            },
            "execute": function(unit, dest) {
                unit.position = dest.position;
            }
        },
        "attack": {
            "check": function(attacker, defender) {
                return attacker.canReach(defender);
            },
            "execute": function(attacker, defender) {
                defender.life -= attacker.attack;
                if (defender.canReach(attacker)) {
                    attacker.life -= defender.defense;
                }
            }
        }
    };

    exports.actions = actions;

})(typeof exports === 'undefined' ? this['exports'] = {} : exports);

