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
    observer_ = require("../util/observer.js"),
    subject_ = require("../util/subject.js");

var legacy = new legacy_.Legacy();

exports.PlayerFactory = function(gameEngine) {
    this.gameEngine = gameEngine;

    this.unitFactory = null;
}

exports.PlayerFactory.prototype = {

    /**
     * Create a new player with attributs.
     * @param id, the player identity,
     * @param name, the player name,
     * @param startPoint, coordinates of the cell that will host its unit.
     * @return myPlayer, the created player.
     */
    create: function(id, name, startPoint) {
        var myPlayer = new player_.Player();
        myPlayer.name = name;
        myPlayer.id = id;
        myPlayer.play = true;
        myPlayer.startPoint = startPoint;

        myPlayer.unitFactory = this.unitFactory;

        legacy.inherits(new subject_.Subject(), myPlayer);
        legacy.inherits(new observer_.Observer(), myPlayer);

        // For testing purpose
        myPlayer.addUnit("choucroute");

        return myPlayer;
    },

    /**
     * Create a player from a user requesting to join games
     * @return this. the created player.
     */
    createFromUser: function(user, startPoint) {
        return this.create(user.id, user.login, startPoint);
    },

}
