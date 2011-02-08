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
}

exports.GameFactory.prototype = {

    create: function(id) {
        var myGame = new game_.Game();
        myGame.id = id;
        return myGame;
    },

}
