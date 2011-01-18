var player = require("../lib/world/player.js");

exports["test-new-player"] = function (test) {
        var pl = new player.Player();
        pl.name = "toto";
        test.equal(pl.name, "toto");
        test.done();
    }
