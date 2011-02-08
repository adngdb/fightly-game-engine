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

        var file_ = fs.readFileSync(file,"utf8");
        var mapObject = JSON.parse(file_);
        return mapObject;
    },
}
