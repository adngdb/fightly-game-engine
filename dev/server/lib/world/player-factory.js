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
    this.unitFactory = null;
}

exports.PlayerFactory.prototype = {

    create: function(id, name) {
        var myPlayer = new player_.Player();
        myPlayer.name = name;
        myPlayer.id = id;

        // For testing purpose
        myPlayer.units[0] = this.unitFactory.create("alpha",myPlayer);
	myPlayer.play = true;
        return myPlayer;
    },

    createFromUser: function(user) {
        return this.create(user.id, user.login);
    },

}
