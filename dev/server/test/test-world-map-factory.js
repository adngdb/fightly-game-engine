// playerFactory class:

var map_ = require("../lib/world/map-factory.js");

exports["test-world-map-factory-create"] = function(test) {

        var createdMap = new map_.MapFactory.prototype.create(3,2);

        for (i=0;i<2;i++) {
            for (j=0;j<3;j++) {
                test.equal(createdMap.cells[i][j].type,null);
                test.equal(createdMap.cells[i][j].x,-1);
                test.equal(createdMap.cells[i][j].y,-1);
            }
        }

        test.done();
}
