/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

var cell_ = require("./cell.js");

exports.CellFactory = function() {

}

exports.CellFactory.prototype = {

    create: function(type,x,y) {

        var myCell = new cell_.Cell();
        myCell.type = type;
        myCell.x = x;
        myCell.y = y;
        return myCell;
    },
}
