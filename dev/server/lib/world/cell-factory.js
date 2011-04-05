/* *********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

var Cell = require("./cell.js");

/**
 * Class CellFactory
 *
 * @constructor
 */
function CellFactory() {

}

CellFactory.prototype = {

    /**
     * Create a new cell.
     * @param type. the cell's type.
     * @param x. The cell's abscissa.
     * @param y. The cell's ordinate.
     * @return myCell. The created cell.
     */
    create: function(type,x,y) {

        var myCell = new Cell();
        myCell.type = type;
        myCell.x = x;
        myCell.y = y;
        return myCell;
    },
}

module.exports = CellFactory;
