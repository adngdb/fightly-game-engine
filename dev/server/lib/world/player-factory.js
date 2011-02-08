/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/


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
