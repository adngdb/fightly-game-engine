var pf = require("../lib/world/player-factory.js");

exports["test-create"] = function (test) {
        var factory = new pf.PlayerFactory();
        var player = factory.create(1,"tata");
        test.equal(player.name, "tata");
        test.equal(player.id, 1);
        test.done();
    }

