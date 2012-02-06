/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/


var map_ = require("../lib/world/map.js");
var cellFactory_ = require("../lib/world/cell-factory.js");


exports["test-world-map"] = function(test) {
        var myMap = new map_.Map();
        test.equal(myMap.height,-1);
        test.equal(myMap.width,-1);
        test.done();
}

exports["test-map-toJSON"] = function(test) {

        var myMap = new map_.Map();
        var str = "{"+"\"height\"" + ":-1,"+"\"width\""+":-1,"+"\"cells\""+":[],"+"\"startPoints\""+":[]}" ;
        test.equal(str,JSON.stringify(myMap.toJSON()));
        test.done();
}

exports["test-map-getDistanceBetween"] =function (test) {
        var myMap = new map_.Map();
        var cell1 = new cellFactory_.CellFactory().create("mountain",0,1);
        var cell2 = new cellFactory_.CellFactory().create("mountain",2,3);
        var d = myMap.getDistanceBetween(cell1,cell2);
        test.equal(d,4);
        test.done();
}
