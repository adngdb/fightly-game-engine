// Map class


exports.Map = function() {
    this.height = -1;
    this.width = -1;
    this.cells = [];
}

exports.Map.prototype = {

    toJSON : function() {
        return {
            "height": this.height,
            "width" : this.width,
            "cells" : this.cells
        }
    },
}
