/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

var sys = require('sys'),
    comManager_ = require('./network/com-manager.js'),
    messageParser_ = require('./network/message-parser.js'),
    messageBuilder_ = require('./network/message-builder.js'),
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

    this.comManager = null;
    this.messageBuilder = null;
    this.messageParser = null;

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

        this.comManager = new comManager_.ComManager(this);
        this.messageBuilder = new messageBuilder_.MessageBuilder();
        this.messageParser = new messageParser_.MessageParser(this);

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
        this.comManager.listen(3401);
        return this;
    },

    onConnectionOpen: function(client) {
        this.client.send(this.messageBuilder.createAuthenticationQuery());
    },

};
