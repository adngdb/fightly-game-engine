/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/


exports.Map = function() {
    this.height = -1;
    this.width = -1;
    this.cells = [];
    this.nbMaxPlayer = -1;
    this.startPoints = [];
}


exports.Map.prototype = {

    toJSON : function() {

        var data = {
            "height": this.height,
            "width" : this.width,
            "cells" : this.cells,
            "nbMaxPlayers" : this.nbMaxPlayers,
            "startPoints" : this.startPoints
        };

        return data;
    },

    getDistanceBetween : function(cell1,cell2) {

        var distance = Math.abs(cell1.x - cell2.x) + Math.abs(cell1.y - cell2.y);
        return distance;

    },

    getStartPoints : function() {
        return this.startPoints;
    },

    /**
     * Get a cell by coodinates x and y
     * @param x Coordinate x of this cell
     * @param y Coordinate y of this cell
     * @return cell
     */
    getCell: function(x, y) {
        for (var i = 0; i < this.cells.length; i++) {
            var line = this.cells[i];
            for (var j = 0; j < line.length; j++) {
                if(line[j].x == x && line[j].y == y) {
                    return line[j];
                }
            }
        }

        return null;
    },

}
