// gameFactory class

var game = require("./game.js");

exports.GameFactory = function() {
}

exports.GameFactory.prototype = {

    create: function(id) {
        var myGame = new game.Game();
        myGame.id = id;
        return myGame;
    },

}
