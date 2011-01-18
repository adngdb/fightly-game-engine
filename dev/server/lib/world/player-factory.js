// playerFactory class:

var player = require("./player.js");

exports.PlayerFactory = function() {

}

exports.PlayerFactory.prototype = {

    create: function(id,login) {
        var myPlayer = new player.Player();

        myPlayer.name = login;
        myPlayer.id = id;

        return myPlayer;
    },

}
