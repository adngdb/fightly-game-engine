var player_ = require("../lib/world/player.js");

exports["test-new-player"] = function (test) {
        var pl = new player_.Player();
        pl.name = "toto";
        test.equal(pl.name, "toto");
        test.equal(pl.turn,-1);
        test.done();
    }

exports["test-player-toJSON"] = function (test) {

        var pl = new player_.Player();
        var str = "{" + "\"id\"" + ":-1,"+"\"name\""+":null,"+"\"turn\""+":-1,"+"\"units\""+":[]}" ;
        test.equal(str,pl.toJSON());
        test.done();
}
