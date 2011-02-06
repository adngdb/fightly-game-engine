/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

var util                = require('util'),
    comManager_         = require('./network/com-manager.js'),
    messageBuilder_     = require('./network/message-builder.js'),
    messageParser_      = require('./network/message-parser.js'),
    gameFactory_        = require('./world/game-factory.js'),
    playerFactory_      = require('./world/player-factory.js');

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
        util.log("GameEngine: init()");

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
        util.log("GameEngine: start()");
        this.comManager.listen(3401);
        return this;
    },

    //---> Network functions

    sendPlayer: function(player, message) {
        this.comManager.send(player.id, message);
        return this;
    },

    sendGame: function(game, message) {
        this.comManager.send(game.getPlayersIds(), message);  // TODO Game.getPlayersIds
        return this;
    },

    //---> Events functions

    onConnectionOpen: function(client) {
        util.log('GameEngine.onConnectionOpen');
        client.send(this.messageBuilder.createAuthenticationQuery());

        return this;
    },

    onLogin: function(username, clientId) {
        var player = this.playerFactory.create(clientId);
        player.login = username;
        this.players.push(player);
        this.sendPlayer(player, this.messageBuilder.createAuthenticationData(username, true));

        return this;
    },

    onJoinGame: function(gameId, clientId) {
        var game = this.games[gameId];
        if (typeof game != "undefined" && game != null) {
            var msg = this.messageBuilder.createNewPlayerData(player);
            this.send(game, msg);
            game.addPlayer(this.players[clientId]);
        }
        // this game doesn't exist yet: create it
        else {
            game = this.gameFactory.create(gameId);
            game.addPlayer(this.players[clientId]);
            this.games[gameId] = game;
        }
        // Sending game data to the new coming player
        var gameData = this.messageBuilder.createNewGameData(game);
        this.sendPlayer(this.players[clientId], gameData);

        return this;
    },

};
