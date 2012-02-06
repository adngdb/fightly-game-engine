/* *********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/


var Player      = require("./player.js"),
    Legacy      = require("../util/legacy.js"),
    Observer    = require("../util/observer.js"),
    Subject     = require("../util/subject.js");

var legacy = new Legacy();

/**
 * Class PlayerFactory
 *
 * @constructor
 */
function PlayerFactory(gameEngine) {
    this.gameEngine = gameEngine;

    this.unitFactory = null;
}

PlayerFactory.prototype = {

    /**
     * Create a new player with attributs.
     * @param id, the player identity,
     * @param name, the player name,
     * @param startPoint, coordinates of the cell that will host its unit.
     * @return myPlayer, the created player.
     */
    create: function(id, name, startPoint) {
        var myPlayer = new Player();
        myPlayer.name = name;
        myPlayer.id = id;
        myPlayer.play = true;
        myPlayer.startPoint = startPoint;

        myPlayer.unitFactory = this.unitFactory;

        legacy.inherits(new Subject(), myPlayer);
        legacy.inherits(new Observer(), myPlayer);

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

module.exports = PlayerFactory;
