var sys = require('sys');

var components = {},
    entities = {},
    games = {};

exports.log = function(data) {
    sys.log("\033[0;32m"+data+"\033[0m");
};
var log = this.log;

exports.WGE = function() {
    this.init();
};

exports.WGE.prototype = {
    init: function() {
        log("GameEngine: init()");
        return this;
    },

    start: function() {
        log("GameEngine: start()");
        return this;
    },

    getGames: function() {
        return this.games;
    }
}
