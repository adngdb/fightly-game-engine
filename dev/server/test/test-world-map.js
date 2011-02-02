var map_ = require("../lib/world/map.js");

exports["test-world-map"] = function(test) {
        var myMap = new map_.Map();
        test.equal(myMap.length,-1);
        test.equal(myMap.width,-1);
        test.done();
}

exports["test-map-toJSON"] = function(test) {

        var myMap = new map_.Map();
        var str = "{" + "\"length\"" + ":-1,"+ "\"width\"" + ":-1,"+"\"cells\"" + ":[]" +"}" ;
        test.equal(str,myMap.toJSON());
        test.done();
}
