/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

/**
 * Class GameEngine
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 * @constructor
 */
GameEngine = function() {
    this.comManager = null;
    this.messageBuilder = null;
    this.displayer = null;
    this.eventManager = null;

    this.world = null;

    this._handlers = [];
};

GameEngine.prototype = {

    /**
     * Initialize the GameEngine, instanciate tools.
     * @return this
     */
    init: function() {
        this.comManager = new ComManager(this);

        this.messageBuilder = new MessageBuilder();
        this.world = new WorldManager();
        this.eventManager = new EventManager(this);

        this.displayer = new Displayer(this.world, this.eventManager);

        return this;
    },

    /**
     * Start the GameEngine.
     * @return this
     */
    start: function() {
        this.comManager.init();
        return this;
    },

    /**
     * Invalidate the data, forcing to redraw the game.
     * @return this
     */
    invalidate: function() {
        this.displayer.invalidate();
        return this;
    },

    //---> Triggers

    /**
     * Call a event
     * @param event Name of event
     * @return this
     */
    trigger: function(event) {
    if(this._handlers[event]) {
            this._handlers[event].apply(this, arguments);
    }
    else {
        log("Event: " + event + " is unregistered.");
    }
    },

    /**
     * Add a event listener
     * @param event Name of event
     * @param callback Nam of function which listens this event
     * @return this
     */
    addListener: function(event, callback) {
    if(typeof(callback) == "function"){
            this._handlers[event] = callback;
    }
    else {
        log("Need a function to listen this event");
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

    //---> Events

    onAuthenticationQuery: function() {
        var login = this.displayer.getUserLogin();
        this.comManager.send(this.messageBuilder.createAuthenticationLogin(login));
    },

    onAuthenticationConfirm: function(id, valid) {
        if (valid == true) {
            this.world.player = id;
            this.joinGame();
        }
        else {
            // TODO
        }
    },

    joinGame: function() {
        var gameId = this.displayer.getGameId();
        this.comManager.send( this.messageBuilder.createJoinGameAction(gameId) );
    },

};

var gameEngineInstance = new GameEngine().init().start();

function log(msg) {
    gameEngineInstance.displayer.log(msg);
}
