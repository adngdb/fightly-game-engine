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
Displayer = function(world) {
    this.world = world;

    this.loggerElt = $('#log');
};

Displayer.prototype = {

    log: function(msg) {
        // TODO
        // Check if the logging is activated
        this.loggerElt.append('<li>'+msg+'</li>');
    },

    getUserLogin: function() {
        // TODO
        // Use something better to get the credentials
        return prompt("Username", "player");
    },

    getGameId: function() {
        // TODO
        // Check the variable's name
        return window.location.search.substring(1).split("=")[1];
    },

};
