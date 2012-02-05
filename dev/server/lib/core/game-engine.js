/* *********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

var util = require('util'),
    User = require('./user.js'),
    Legacy = require('../util/legacy.js'),
    Observer = require('../util/observer.js'),
    ComManager = require('../network/com-manager.js'),
    MessageBuilder = require('../network/message-builder.js'),
    MessageParser = require('../network/message-parser.js'),
    ComponentEntityManager = require('../../vendor/component-entity/component-entity-manager');

/**
 * Class GameEngine
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 * @constructor
 */
function GameEngine() {

    this.comManager = null;
    this.messageBuilder = null;
    this.messageParser = null;

    this.games = [];
    this.users = [];

    this._handlers = [];

    this.init();
};

GameEngine.prototype = {

    /**
     * Initialize the GameEngine.
     *
     * @return this.
     */
    init: function() {
        util.log("GameEngine: init()");

        // Observer pattern
        var legacy = new Legacy();
        legacy.inherits(new Observer(), this);
        legacy.inherits(new ComponentEntityManager(), this);

        this.comManager = new ComManager(this);
        this.messageBuilder = new MessageBuilder();
        this.messageParser = new MessageParser(this);

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

    getUser: function(id) {
        var i = 0,
            l = this.users.length;

        for (; i < l; i++) {
            if (this.users[i].id == id) {
                return this.users[i];
            }
        }

        return null;
    },

    addUser: function(user) {
        this.users.push(user);
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

    sendUser: function(user, message) {
        this.comManager.send(user.id, message);
        return this;
    },

    sendGame: function(game, message) {
        this.comManager.send(game.getPlayersIds(), message);  // TODO Game.getPlayersIds
        return this;
    },

    //---> Triggers

    /**
     * Call an event
     * @param event Name of the event to call.
     * @return this.
     */
    trigger: function(event) {
        if (this._handlers[event]) {
            this._handlers[event].apply(this, arguments);
        }
        else {
            util.log("Event: " + event + " is unregistered.");
        }
    },

    /**
     * Add an event listener
     * @param event Name of event
     * @param callback Nam of function which listens this event
     * @return this
     */
    addListener: function(event, callback) {
        if (typeof(callback) == "function"){
            this._handlers[event] = callback;
        }
        else {
            util.log("Need a function to bind this event");
        }

        return this;
    },

    /**
     * Remove a event listener
     * @param event Name of event
     */
    removeListener: function(event) {
        this._handlers = this._handlers.splice(event, 1);
    },

    //---> Events functions

    onConnectionOpen: function(client) {
        util.log('GameEngine.onConnectionOpen');
        client.send(this.messageBuilder.createAuthenticationQuery());

        return this;
    },

    onLogin: function(username, clientId) {
        var user = new User(clientId, username);
        this.addUser(user);
        this.sendUser(user, this.messageBuilder.createAuthenticationData(user.id, true));

        return this;
    },

    onJoinGame: function(gameId, clientId) {
        var game = this.getGame(gameId),
            user = this.getUser(clientId);

        if (game != null) {
            if (game.state == "waiting") {
                //var gameIds = game.getPlayersIds();
                var newPlayer = game.addPlayer( user );
                //var msg = this.messageBuilder.createNewPlayerData( newPlayer );
                //this.comManager.send(gameIds, msg);
            }
            else {
                // TODO Error message
                //this.sendUser(user, this.messageBuilder.create...());
                return this;
            }
        }
        // this game doesn't exist yet: create it
        else {
            game = this.gameFactory.create(gameId);
            game.addPlayer( user );
            this.addGame(game);
        }

        user.inGame = game.id;

        // Sending game data to the new coming player
        var gameData = this.messageBuilder.createNewGameData(game);
        this.sendUser(user, gameData);

        return this;
    },

    onMoveUnit: function(unitId, toX, toY, clientId) {
        var user = this.getUser(clientId);
        if (user.inGame == null) {
            util.log("User is not in game, cannot call onMoveUnit");
            return this;
        }
        var game = this.getGame(user.inGame);

        var am = new ActionManager(game);
        am.moveUnit(user.id, unitId, toX, toY);
    },

    onAttackUnit: function(attackerId, defenderId, clientId) {
        var user = this.getUser(clientId);
        if (user.inGame == null) {
            util.log("User is not in game, cannot call onMoveUnit");
            return this;
        }
        var game = this.getGame(user.inGame);

        var am = new ActionManager(game);
        am.attackUnit(user.id, attackerId, defenderId);
    },

    onEndTurn: function(clientId) {
        var user = this.getUser(clientId);
        if (user.inGame == null) {
            util.log("User is not in game, cannot call onEndTurn");
            return this;
        }

        var game = this.getGame(user.inGame);

        var am = new ActionManager(game);
        am.endTurn(user.id);
    },

    onAbandon: function(clientId) {
        var user = this.getUser(clientId);
        if (user.inGame == null) {
            util.log("User is not in game, cannot call onAbandon");
            return this;
        }

        var game = this.getGame(user.inGame);

        var am = new ActionManager(game);
        am.abandon(user.id);
    },

    onDisconnect: function(clientId) {
         var user = this.getUser(clientId);
         var game = this.getGame(user.inGame);

         game.removePlayer(user.id);
    },

    onUpdate: function(context) {
        switch (context.object) {
            case "Unit":
                var unitData = {};
                unitData.id = context.instance.id;
                unitData[context.modified] = context.instance[context.modified];
                this.sendGame(context.game, this.messageBuilder.createUpdateUnitData(unitData));
                break;

            case "Player":
                var playerData = {};
                playerData.id = context.instance.id;
                playerData[context.modified] = context.instance[context.modified];
                this.sendGame(context.game, this.messageBuilder.createUpdatePlayerData(playerData));
                break;

            case "Game":
                var gameData = {};
                gameData.id = context.instance.id;
                if (context.modified == "*") {
                    gameData = context.instance;
                }
                else if (context.modified == "currentPlayer") {
                    gameData[context.modified] = context.instance[context.modified].id;
                }
                else {
                    gameData[context.modified] = context.instance[context.modified];
                }
                this.sendGame(context.game, this.messageBuilder.createUpdateGameData(gameData));
                break;

       }
    },

};

module.exports = GameEngine;
