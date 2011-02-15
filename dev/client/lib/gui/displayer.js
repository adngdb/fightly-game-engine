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
Displayer = function(world, eventManager) {
    this.world = world;
    this.eventManager = eventManager;

    // HTML elements
    this.loggerElt  = $('#log');
    this.gameElt    = $('#game');

    this.gameDisplayer = new GameDisplayer(this.world, this.eventManager);

    this.inGame = false;
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

    invalidate: function() {
        if (this.world.game != null) {
            this.displayGame();
        }
        else {
            this.displayState();
        }
        this.eventManager.bindAll();
    },

    reset: function() {
        this.gameElt.empty();
        return this;
    },

    displayState: function() {
        // TODO
    },

    displayGame: function() {
        var state = this.world.game.state;
        var players = this.world.game.players;

        this.reset();

        if (state == "waiting") {
            this.gameElt.append('<h1>Waiting for opponents...</h1>');
        }
        else {
            if (!this.inGame) {
                this.gameDisplayer.init();
                this.inGame = true;
            }
            this.gameDisplayer.display();
        }

        this.gameElt.append('<ul>');
        for (var i = 0; i < players.length; i++) {
            this.gameElt.append('<li>'+ players[i].name +'</li>');
        }
        this.gameElt.append('</ul>');
    },

};
