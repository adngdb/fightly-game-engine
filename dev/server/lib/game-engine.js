/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 **********************************************************************/

var sys = require('sys'),
    server_ = require('./network/server.js'),
    gameFactory_ = require('./world/game-factory.js'),
    playerFactory_ = require('./world/player-factory.js');

/**
 * Class GameEngine
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 */
exports.GameEngine = function() {

    this.playerFactory = null;
    this.gameFactory = null;

    this.server = null;

    this.games = [];
    this.players = [];

    this.init();
};

exports.GameEngine.prototype = {

    /**
     * Initialize the GameEngine.
     *
     * @return this.
     */
    init: function() {
        sys.log("GameEngine: init()");

        this.server = new server_.Server();

        // Factories
        this.gameFactory = new gameFactory_.GameFactory();
        this.playerFactory = new playerFactory_.PlayerFactory();

        return this;
    },

    /**
     * Start the GameEngine.
     *
     * @return this.
     */
    start: function() {
        sys.log("GameEngine: start()");
        return this;
    },

};
