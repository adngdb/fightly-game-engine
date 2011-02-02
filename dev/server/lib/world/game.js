// Game class

var map_= require("./map.js");

exports.Game = function() {
    this.id = -1;
    this.players = [];
    this.map = null;
}

var game_= require("./game.js");
var newGame = new game_.Game();

exports.Game.prototype = {
    //add a new player
    addPlayer : function(player){
        this.players.push(player);
    },

    toJSON : function() {

        var data = {
            "id": this.id,
            "players" : this.players,
            "map" : this.map
        };

        return JSON.stringify(data);
    },

    toJSON : function() {
        return JSON.stringify(newGame);
    },
}
