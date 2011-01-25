var player_ = require("../lib/world/player.js");

exports["test-new-player"] = function (test) {
        var pl = new player_.Player();
        pl.name = "toto";
        test.equal(pl.name, "toto");
        test.equal(pl.turn,-1);
        test.done();
    }


