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

    //---> Getters and setters

    getPlayer: function(id) {
        var i = 0,
            l = this.players.length;

        for (; i < l; i++) {
            if (this.players[i].id == id) {
                return this.players[i];
            }
        }

        return null;
    },

    addPlayer: function(player) {
        this.players.push(player);
        return this;
    },

    getGame: function(id) {
        var i = 0,
            l = this.games.length;

        for (; i < l; i++) {
            if (this.games[i].id == id) {
                return this.games[i];
            }
        }

        return null;
    },

    addGame: function(game) {
        this.games.push(game);
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
        this.addPlayer(player);
        this.sendPlayer(player, this.messageBuilder.createAuthenticationData(username, true));

        return this;
    },

    onJoinGame: function(gameId, clientId) {
        var game = this.getGame(gameId),
            player = this.getPlayer(clientId);

        if (game != null) {
            var msg = this.messageBuilder.createNewPlayerData( player );
            this.sendGame(game, msg);
            game.addPlayer( player );
        }
        // this game doesn't exist yet: create it
        else {
            game = this.gameFactory.create(gameId);
            game.addPlayer( player );
            this.addGame(game);
        }

        // Sending game data to the new coming player
        var gameData = this.messageBuilder.createNewGameData(game);
        this.sendPlayer(player, gameData);

        return this;
    },

};
