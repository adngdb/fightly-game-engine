/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

var map_ = require("./map.js");
var cell_ = require("./cell.js");
var fs = require("fs");
var cellFactory_ = require("./cell-factory.js");

exports.MapFactory = function() {
    this.cellFactory = null;
}

exports.MapFactory.prototype = {

    create: function() {
        return this.createFromFile('data/maps/sample-map.json');
    },

    /*create: function(height,width) {

        var myMap = new map_.Map();
        myMap.height = height;
        myMap.width = width;

        for (i=0;i<width;i++) {
            myMap.cells[i] = [];
            for (j=0;j<height;j++) {
                myMap.cells[i][j]= this.cellFactory.create("plains", i, j);
            }
        }

        return myMap;
    },*/

    createFromFile : function(file) {

        var myMap = new map_.Map();
        var file_ = fs.readFileSync(file,"utf8");
        var mapObject = JSON.parse(file_);

        myMap.width = mapObject.width;
        myMap.height = mapObject.height;
        myMap.nbMaxPlayers = mapObject.nbMaxPlayers;

        for (var i = 0; i < mapObject.nbMaxPlayers ; i++) {
                var startPoint = mapObject.startPoints[i];
                myMap.startPoints[i].type = startPoint.type;
                myMap.startPoints[i].x = startPoint.x;
                myMap.startPoints[i].y = startPoint.y;
        }


        for (var i = 0; i < myMap.width; i++) {
            myMap.cells[i] = [];
            for (var j = 0; j < myMap.height; j++) {
                var cell = mapObject.cells[i][j];
                myMap.cells[i][j] = this.cellFactory.create(cell.type, cell.x, cell.y);
            }
        }
        return myMap;
    },


}
