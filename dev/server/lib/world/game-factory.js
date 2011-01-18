// gameFactory class

var game = require("./game.js");

function GameFactory() {
}

GameFactory.prototype = {

    create: function(id) {
        var myGame = new game.Game();
        myGame.id = id;
        return myGame;
    },

}
