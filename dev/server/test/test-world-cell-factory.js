
var cellFactory_ = require("../lib/world/cell-factory.js");

exports["test-cell-factory-create"] = function (test) {

        var cell =  cellFactory_.CellFactory.prototype.create("eau",10,20);

        test.equal(cell.type, "eau");
        test.equal(cell.x, 10);
        test.equal(cell.y, 20);
        test.done();
}

