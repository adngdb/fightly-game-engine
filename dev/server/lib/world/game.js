// Game class


exports.Game = function() {
    this.id = -1;
    this.players = [];
}

exports.Game.prototype = {
    //add a new player
    addPlayer : function(player){
        this.players.push(player);
    },
}

