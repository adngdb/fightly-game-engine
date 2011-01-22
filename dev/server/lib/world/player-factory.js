// playerFactory class:

var playerFile = require("./player.js");
var unitFile = require("./unit.js");

exports.PlayerFactory = function() {

}

exports.PlayerFactory.prototype = {

    create: function(id,login) {

        var myPlayer = new playerFile.Player();
        myPlayer.name = login;
        myPlayer.id = id;

        for (i=0 ; i<myPlayer.unit.length ; i++) {
            myPlayer.unit[i] = new unitFile.Unit() ;
        }

        return myPlayer;
    },

}
