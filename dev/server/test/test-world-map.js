/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/


var map_ = require("../lib/world/map.js");

exports["test-world-map"] = function(test) {
        var myMap = new map_.Map();
        test.equal(myMap.height,-1);
        test.equal(myMap.width,-1);
        test.done();
}

exports["test-map-toJSON"] = function(test) {

        var myMap = new map_.Map();
//str = "{" + "\"id\"" + ":-1,"+"\"name\""+":null,"

        var str = "{"+"\"height\"" + ":-1,"+"\"width\""+":-1,"+"\"cells\""+":[]}" ;
        test.equal(str,JSON.stringify(myMap.toJSON()));
        test.done();
}
