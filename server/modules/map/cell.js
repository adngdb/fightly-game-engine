/* *********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

/**
 * Class Cell
 *
 * @constructor
 */
function Cell() {
    this.type = null; // plains, mountain, swamp
    this.x = -1;
    this.y = -1;
}

Cell.prototype = {

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

    toString: function() {
		return "Cell: X = " + this.x + ", Y = " + this.y + ", Type = " + this.type;
	},
}

module.exports = Cell;
