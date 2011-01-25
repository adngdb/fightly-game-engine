var game_ = require("../lib/world/game.js");

exports["test-game-players"] = function(test) {

        var gm = new game_.Game();
        gm.players = ["toto","titi","tata"];
        test.equal(gm.players[0], "toto");
        test.done();
}

exports["test-game-map"] = function(test) {

        var gm = new game_.Game();
        var l = gm.map.length ;
        test.equal(l, -1);
        test.done();
}

