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
}
