// gameFactory class

var game = require("./game.js");

exports.GameFactory = function() {
    this.configs = {
        "default": {
            "nb_players_max": "4",
            "map": {
                "source": "data/maps/sample-map.json"
            }
        }
    };
}

exports.GameFactory.prototype = {

    create: function(id) {
        var myGame = new game.Game();
        myGame.id = id;
        return myGame;
    },

}
