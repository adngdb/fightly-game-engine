/* ****************************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 * ***************************************************************************/

(function(exports) {
    var Position = {

        "x": 0,
        "y": 0,
        "z": 0,

        "isAtOrigin": function() {
            return this.x === 0 && this.y === 0 && this.z === 0;
        }
    };

    exports.Position = Position;

})(typeof exports === 'undefined' ? this['exports'] = {} : exports);
