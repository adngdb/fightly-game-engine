
var game_ = require("../lib/world/game-factory.js");

exports["test-world-game-factory-create"] = function(test) {
        var createdGame = new game_.GameFactory.prototype.create(123);
        test.equal(createdGame.id,123);
        test.done();
}
