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

}

exports.GameFactory.prototype = {

    create: function(id) {
        var myGame = new game_.Game();
        myGame.id = id;
        myGame.playerFactory = this.playerFactory;
        myGame.mapFactory = this.mapFactory;

        return myGame;
    },

}
