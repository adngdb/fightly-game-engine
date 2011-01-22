// playerFactory class:

var mapFile = require("./map.js");
var cellFile = require("./cell.js");

exports.MapFactory = function() {

}

exports.MapFactory.prototype = {

    create: function(len,wid) {
        var myCell = new cellFile.Cell();
        var myMap = new mapFile.Map();
        myMap.length = len;
        myMap.width = wid;

        for (i=0;i<wid;i++) {
            myMap.cells[i] = [];
            for (j=0;j<len;j++) {
                myMap.cells[i][j]= new cellFile.Cell();
            }
        }

        return myMap;
    },

}
