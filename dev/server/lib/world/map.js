/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

var util = require('util');

exports.Map = function() {
    this.height = -1;
    this.width = -1;
    this.cells = [];
    this.nbMaxPlayer = -1;
    this.startPoints = [];
}


exports.Map.prototype = {

    /**
     * Transform the map's attributs to a JSON string
     * @return the JSON string.
     */
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

    /**
     * Calculate the Manathan distance between two cells
     * @param c1. the first cell,
     * @param c2. the seconde cell,
     * @return distance. the distance between c1 and c2.
     */
    getDistanceBetween : function(c1, c2) {
        var cell1 = this._squarify(c1);
        var cell2 = this._squarify(c2);
        var distance = Math.abs(cell1.x - cell2.x) + Math.abs(cell1.y - cell2.y);
        return distance;

    },

    /**
     * this method changes the coordinates of the diamond cell to
     * transform it to a square cells
     * @param cell, the diamond cell
     * @return c, the transformed cell
     */
    _squarify: function(cell) {
        var c = {};
        c.x = cell.x - cell.y / 2;
        c.y = cell.y + c.x;
        return c;
    },

    /**
     * this method changes the coordinates of the diamond cell to
     * transform it to a square cells
     * @param cell, the diamond cell
     * @return c, the transformed cell
     */
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

    /**
     * Allocate a default cell to one player
     * @return this.startPoints.shift(): a first cells at the
     * startPoints array.
     */
    allocStartPoint : function() {
        return this.startPoints.shift();
    }

}
