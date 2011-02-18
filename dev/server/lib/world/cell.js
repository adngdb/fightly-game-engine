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

    /**
     * Transform the cell's attributs to a JSON string
     * @return data, contains the unit attributs.
     */
    toJSON : function() {

        var data = {
            "type": this.type,
            "x" : this.x ,
            "y" : this.y,
        };

        return data;
    },
}
