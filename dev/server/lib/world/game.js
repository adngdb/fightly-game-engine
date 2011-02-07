// Game class


exports.Game = function() {
    this.id = -1;
    this.players = [];

    this.state = "waiting";
}

exports.Game.prototype = {
    //add a new player
    addPlayer : function(player){
        this.players.push(player);
    },

    getPlayersIds: function() {
        var i = 0,
            l = this.players.length,
            ids = [];

        for (; i < l; i++) {
            ids.push(this.players[i].id);
        }

        return ids;
    },

    toJSON: function() {
        return {
            "id": this.id,
            "players": this.players,
            "state": this.state,
        };
    },
}

