var sys = require('sys'),
    server = require('./network/server.js'),
    gf = require('./world/game-factory.js'),
    pf = require('./world/player-factory.js');

var games = [];

exports.WGE = function() {

    this.playerFactory = null;
    this.gameFactory = null;

    this.server = new server.Server();

    this.init();
};

exports.WGE.prototype = {
    init: function() {
        sys.log("GameEngine: init()");

        // Factories
        this.gameFactory = new gf.GameFactory();
        this.playerFactory = new pf.PlayerFactory();

        return this;
    },

    start: function() {
        sys.log("GameEngine: start()");
        return this;
    },
}
