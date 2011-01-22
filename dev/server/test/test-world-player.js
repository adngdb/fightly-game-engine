var playerFile = require("../lib/world/player.js");

exports["test-new-player"] = function (test) {
        var pl = new playerFile.Player();
        pl.name = "toto";
        test.equal(pl.name, "toto");
        test.equal(pl.turn,-1);
        test.done();
    }


