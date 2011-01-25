// playerFactory class:

var player_ = require("./player.js");
var unit_ = require("./unit.js");

exports.PlayerFactory = function() {

}

exports.PlayerFactory.prototype = {

    create: function(id,login) {

        var myPlayer = new player_.Player();
        myPlayer.name = login;
        myPlayer.id = id;

        return myPlayer;
    },

}
