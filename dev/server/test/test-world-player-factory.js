var playerFactory_ = require("../lib/world/player-factory.js");

exports["test-create"] = function (test) {

        var player =  playerFactory_.PlayerFactory.prototype.create(1,"tata");

        test.equal(player.name, "tata");
        test.equal(player.id, 1);
        test.done();
}

