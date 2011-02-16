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

    allocStartPoint : function() {
        return startPoints.splice(0,1);
    }

}
