// Game class

var mapFile = require("./map.js");

exports.Game = function() {
    this.id = -1;
    this.players = [];
    this.map = new mapFile.Map();
}

exports.Game.prototype = {
    //add a new player
    addPlayer : function(player){
        this.players.push(player);
    },
}

