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
 */
GameEngine = function() {
    this.comManager = null;
    this.messageBuilder = null;
    this.displayer = null;

    this.world = null;

    this.player = null;

    this._handlers = [];
};

GameEngine.prototype = {

    /**
     * Initialize the GameEngine, instanciate tools.
     * @return this
     */
    init: function() {
        this.messageBuilder = new MessageBuilder();
        this.world = new WorldManager();
        this.displayer = new Displayer(this.world);

        this.comManager = new ComManager(this);
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

    trigger: function(event, data) {
        this._handlers[event].call(this, data);
        return this;
    },

    bind: function(event, callback) {
        this._handlers[event] = callback;
        return this;
    },

    unbind: function(event) {
        this._handlers.splice(event, 1);
    },

    onAuthenticationQuery: function() {
        var login = this.displayer.getUserLogin();
        this.comManager.send(this.messageBuilder.createAuthenticationLogin(login));
    },

    onAuthenticationConfirm: function(username, valid) {
        if (valid == true) {
            this.player = username;
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

    newGame: function(data) {
        this.world.gameData(data);
    },

};

var gameEngineInstance = new GameEngine().init().start();

function log(msg) {
    gameEngineInstance.displayer.log(msg);
}
