var pf = require("../lib/world/player-factory.js");
//var unitFile = require("../lib/world/unit.js");

exports["test-create"] = function (test) {

        var player =  pf.PlayerFactory.prototype.create(1,"tata");

        for (i=0;i<2;i++) {
            test.equal(player.unit[i].id,-1);
        }
        test.equal(player.name, "tata");
        test.equal(player.id, 1);

        test.done();
}

