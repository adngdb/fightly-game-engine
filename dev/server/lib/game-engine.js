/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

var util                = require('util'),

    user_               = require('./user.js'),

    legacy_             = require('./util/legacy.js'),
    observer_           = require('./util/observer.js'),

    comManager_         = require('./network/com-manager.js'),
    messageBuilder_     = require('./network/message-builder.js'),
    messageParser_      = require('./network/message-parser.js'),

    actionManager_      = require('./rules/action-manager.js'),
    rules_              = require('./rules/rules.js'),

    gameFactory_        = require('./world/game-factory.js'),
    playerFactory_      = require('./world/player-factory.js'),
    mapFactory_         = require('./world/map-factory.js'),
    cellFactory_        = require('./world/cell-factory.js'),
    unitFactory_        = require('./world/unit-factory.js');


/**
 * Class GameEngine
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 */
exports.GameEngine = function() {

    this.gameFactory = null;
    this.playerFactory = null;
    this.mapFactory = null;
    this.cellFactory = null;
    this.unitFactory = null;

    this.comManager = null;
    this.messageBuilder = null;
    this.messageParser = null;

    this.rules = null;

    this.games = [];
    this.users = [];

    this._handlers = [];

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

        // Observer pattern
        var legacy = new legacy_.Legacy();
        legacy.inherits(new observer_.Observer(), this);

        this.comManager = new comManager_.ComManager(this);
        this.messageBuilder = new messageBuilder_.MessageBuilder();
        this.messageParser = new messageParser_.MessageParser(this);

        // Factories
        this._initFactories();

        return this;
    },

    /**
     * Initialize factories and assign them.
     *
     * @return this.
     */
    _initFactories: function() {
        this.gameFactory = new gameFactory_.GameFactory(this);
        this.playerFactory = new playerFactory_.PlayerFactory();
        this.unitFactory = new unitFactory_.UnitFactory();
        this.mapFactory = new mapFactory_.MapFactory();
        this.cellFactory = new cellFactory_.CellFactory();

        this.gameFactory.playerFactory = this.playerFactory;
        this.gameFactory.mapFactory = this.mapFactory;
        this.playerFactory.unitFactory = this.unitFactory;
        this.mapFactory.cellFactory = this.cellFactory;

        this._configureFactories();

        return this;
    },


    _configureFactories: function() {
        this.rules = new rules_.Rules(this);
        this.rules.load('rules.json');
        this.rules.configureFactories();

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
     * Call a event
     * @param event Name of event
     * @return this
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
     * Add a event listener
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
        var user = new user_.User(clientId, username);
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

        var am = new actionManager_.ActionManager(game);
        am.moveUnit(user.id, unitId, toX, toY);
    },

    onAttackUnit: function(attackerId, defenderId, clientId) {
        var user = this.getUser(clientId);
        if (user.inGame == null) {
            util.log("User is not in game, cannot call onMoveUnit");
            return this;
        }
        var game = this.getGame(user.inGame);

        var am = new actionManager_.ActionManager(game);
        am.attackUnit(user.id, attackerId, defenderId);
    },

    onEndTurn: function(clientId) {
        var user = this.getUser(clientId);
        if (user.inGame == null) {
            util.log("User is not in game, cannot call onEndTurn");
            return this;
        }

        var game = this.getGame(user.inGame);

        var am = new actionManager_.ActionManager(game);
        am.endTurn(user.id);
    },

    onAbandon: function(clientId) {
        var user = this.getUser(clientId);
        if (user.inGame == null) {
            util.log("User is not in game, cannot call onAbandon");
            return this;
        }

        var game = this.getGame(user.inGame);

        var am = new actionManager_.ActionManager(game);
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
    		    gameData[context.modified] = context.instance[context.modified];
    		    this.sendGame(context.game, this.messageBuilder.createUpdateGameData(unitData));
    		    break;    

       }
    },

};
