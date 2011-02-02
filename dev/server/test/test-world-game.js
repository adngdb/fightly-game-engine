var game_ = require("../lib/world/game.js");

exports["test-game-players"] = function(test) {

        var gm = new game_.Game();
        gm.players = ["toto","titi","tata"];
        test.equal(gm.players[0], "toto");
        test.done();
}


exports["test-game-toJSON"] = function(test) {

        var gm = new game_.Game();
        var str = "{" + "\"id\"" + ":-1,"+"\"players\"" + ":[]," + "\"map\""+ ":null}" ;
        test.equal(str,gm.toJSON());
        test.done();
}

