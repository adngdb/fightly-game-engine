/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

/**
 * Class Displayer
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 */
Displayer = function() {
    this.loggerElt = $('#log');
};

Displayer.prototype = {

    log: function(msg) {
        this.loggerElt.append('<li>'+msg+'</li>');
    },

    getUserLogin: function() {
        return prompt("Username", "player");
    },

    getGameId: function() {
        return window.location.search.substring(1).split("=")[1];
    },

};
