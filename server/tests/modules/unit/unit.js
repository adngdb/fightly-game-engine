/**
 * Unit component.
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 * @constructor
 */

(function(exports) {
    var Unit = {
        "_requires": "Position",

        "life": 50,
        "attack": 10,
        "defense": 5,
        "speed": 1,
        "range": 2,

        "canReach": function(unit) {
            return true;
        }
    };

    exports.Unit = Unit;

})(typeof exports === 'undefined' ? this['exports'] = {} : exports);
