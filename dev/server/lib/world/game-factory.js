/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

var game_ = require("./game.js");

exports.GameFactory = function() {
    this.playerFactory = null;
    this.mapFactory = null;
    this.cellFactory = null;
    this.unitFactory = null;
    this.config = {
        "nbMaxPlayers": 2,
        "nbMaxTurns" : 200
    };
}

exports.GameFactory.prototype = {

    create: function(id) {

        var myGame = new game_.Game();
	
        myGame.id = id;
        myGame.map = this.mapFactory.create();
        myGame.playerFactory = this.playerFactory;
        myGame.mapFactory = this.mapFactory;
        myGame.unitFactory = this.unitFactory;
        myGame.nbMaxPlayers = this.config.nbMaxPlayers; 
        myGame.nbMaxTurns = this.config.nbMaxTurns;
        return myGame;
    },

    setConfig : function(nbMaxPlayers, nbMaxTurns) {

        this.config.nbMaxPlayers = nbMaxPlayers;
        this.config.nbMaxTurns = nbMaxTurns;

    },

}
