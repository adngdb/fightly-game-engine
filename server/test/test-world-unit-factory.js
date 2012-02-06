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

        var unit =  unitFactory_.UnitFactory.prototype.create("alpha","player1");

        test.equal(unit.name, "alpha");
        test.equal(unit.owner, "player1");
        test.done();
}
