// Map class


exports.Map = function() {
    this.length = -1;
    this.width = -1;
    this.cells = [];
}


exports.Map.prototype = {

    toJSON : function() {

        var data = {
            "length": this.length,
            "width" : this.width,
            "cells" : this.cells
        };

        return JSON.stringify(data);
    },
}
