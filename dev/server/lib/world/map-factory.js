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

    create: function(height,width) {

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
    },

    createFromFile : function(file) {

        var myMap = new map_.Map();
        var file_ = fs.readFileSync(file,"utf8");
        var mapObject = JSON.parse(file_);
        myMap.width = mapObject.width;
        myMap.height = mapObject.height;
        myMap.cells = mapObject.cells;


        for (i=0;i<myMap.width;i++) {
            for (j=0;j<myMap.height;j++) {

                myMap.cells[i][j].x = mapObject.cells[i][j].x;
                myMap.cells[i][j].y = mapObject.cells[i][j].y;
                myMap.cells[i][j].type = mapObject.cells[i][j].type;
            }
        }
        return myMap;
    },
}
