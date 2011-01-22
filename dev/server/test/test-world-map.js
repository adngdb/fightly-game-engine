var mappy = require("../lib/world/map.js");

exports["test-world-map"] = function(test) {
        var myMap = new mappy.Map();
        test.equal(myMap.length,-1);
        test.equal(myMap.width,-1);
        test.done();
}
