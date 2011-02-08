/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/


var unitFactory_ = require("../lib/world/unit-factory.js");

exports["test-unit-factory-create"] = function (test) {

        var unit =  unitFactory_.UnitFactory.prototype.create(-1,"alpha","player1","monstre",2,3,5,"move",["prop1","prop2"]);

        test.equal(unit.name, "alpha");
        test.equal(unit.move, "move");
        test.done();
}
