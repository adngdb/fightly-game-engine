/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/


var player_ = require("./player.js"),
    legacy_ = require("../util/legacy.js"),
    subject_ = require("../util/subject.js");

var legacy = new legacy_.Legacy();

exports.PlayerFactory = function(gameEngine) {
    this.gameEngine = gameEngine;

    this.unitFactory = null;
}

exports.PlayerFactory.prototype = {

    create: function(id, name) {
        var myPlayer = new player_.Player();
        myPlayer.name = name;
        myPlayer.id = id;
        myPlayer.play = true;

        myPlayer.unitFactory = this.unitFactory;

        // For testing purpose
        myPlayer.addUnit("choucroute");

        legacy.inherits(new subject_.Subject(), myPlayer);

        return myPlayer;
    },

    createFromUser: function(user) {
        return this.create(user.id, user.login);
    },

}
