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
}


exports.Map.prototype = {

    toJSON : function() {

        var data = {
            "height": this.height,
            "width" : this.width,
            "cells" : this.cells
        };

        return data;
    },

    getDistanceBetween : function(cell1,cell2) {

        var distance = abs(cell1.x - cell2.x) + abs(cell1.y - cell2.y);
        return distance;

    }
}
