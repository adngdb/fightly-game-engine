// playerFactory class:

var map_ = require("./map.js");
var cell_ = require("./cell.js");
var fs = require("fs");

exports.MapFactory = function() {

}

exports.MapFactory.prototype = {

    create: function(height,width) {

        var myMap = new map_.Map();
        myMap.height = height;
        myMap.width = width;

        for (i=0;i<width;i++) {
            myMap.cells[i] = [];
            for (j=0;j<height;j++) {
                myMap.cells[i][j]= new cell_.Cell();
            }
        }

        return myMap;
    },

    mapFromFile : function(file) {

        var mapString = fs.readFileSync(file);
        var mapObject = JSON.parse(mapString);
        var mayMap = this.create(mapObject.heigh,mapObject.width);
        console.log("---- heigh = "+ mapObject.heigh + "---- width = "+ mapObject.width );
    },
}

var file_ = require("/home/youness/web-game-engine/dev/server/data/maps/sample-map.json");
var obj = new MapFactory.prototype.mapFromFile(file_);
