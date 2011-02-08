/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

exports.Cell = function() {
    this.type = null; // plains, mountain, swamp
    this.x = -1;
    this.y = -1;
}

exports.Cell.prototype = {

    toJSON : function() {

        var data = {
            "type": this.type,
            "x" : this.x ,
            "y" : this.y,
        };

        return data;
    },
}
