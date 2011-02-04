// Game class

var map_= require("./map.js");

exports.Game = function() {
    this.id = -1;
    this.players = [];
    this.map = null;
}

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
}
