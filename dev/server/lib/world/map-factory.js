/* *********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

var Map = require("./map.js");
var fs = require("fs");

/**
 * Class MapFactory
 *
 * @constructor
 */
function MapFactory() {
    this.cellFactory = null;
}

MapFactory.prototype = {

    create: function() {
        return this.createFromFile('data/maps/sample-map.json');
    },

    /**
     * Create a new map from a map file (JSON format).
     * @param file. A JSON file that contains a map object.
     * @return myMap.  The created map.
     */
    createFromFile : function(file) {

        var myMap = new Map();
        var file_ = fs.readFileSync(file,"utf8");
        var mapObject = JSON.parse(file_);

        myMap.width = mapObject.width;
        myMap.height = mapObject.height;
        myMap.nbMaxPlayers = mapObject.nbMaxPlayers;

        for (var i = 0; i < myMap.width; i++) {
            myMap.cells[i] = [];
            for (var j = 0; j < myMap.height; j++) {
                var cell = mapObject.cells[i][j];
                myMap.cells[i][j] = this.cellFactory.create(cell.type, cell.x, cell.y);
            }
        }

        for (var i = 0; i < mapObject.startPoints.length; i++) {
            var startPoint = mapObject.startPoints[i];
            myMap.startPoints[i] = myMap.getCell(startPoint.x, startPoint.y);
        }

        return myMap;
    },


}

module.exports = MapFactory;
