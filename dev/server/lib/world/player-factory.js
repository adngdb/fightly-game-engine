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

    create: function(id,name) {

        var myPlayer = new player_.Player();
        myPlayer.name = name;
        myPlayer.id = id;
        myPlayer.units[0] = new this.unitFactory.create((id,name,owner,type,attack,defense,view,move,properties);
        return myPlayer;
    },

    createFromUser: function(user) {
        this.create(user.id, user.login);
    },

}
