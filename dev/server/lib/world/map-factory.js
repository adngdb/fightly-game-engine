// playerFactory class:

var map_ = require("./map.js");
var cell_ = require("./cell.js");

exports.MapFactory = function() {

}

exports.MapFactory.prototype = {

    create: function(len,wid) {

        var myMap = new map_.Map();
        myMap.length = len;
        myMap.width = wid;

        for (i=0;i<wid;i++) {
            myMap.cells[i] = [];
            for (j=0;j<len;j++) {
                myMap.cells[i][j]= new cell_.Cell();
            }
        }

        return myMap;
    },

}
