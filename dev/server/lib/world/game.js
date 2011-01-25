// Game class

var map_= require("./map.js");

exports.Game = function() {
    this.id = -1;
    this.players = [];
    this.map = new map_.Map();
}

exports.Game.prototype = {
    //add a new player
    addPlayer : function(player){
        this.players.push(player);
    },
}

