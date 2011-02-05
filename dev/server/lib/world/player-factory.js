// playerFactory class:

var player_ = require("./player.js");

exports.PlayerFactory = function() {

}

exports.PlayerFactory.prototype = {

    create: function(id,name) {

        var myPlayer = new player_.Player();
        myPlayer.name = name;
        myPlayer.id = id;

        return myPlayer;
    },

}
