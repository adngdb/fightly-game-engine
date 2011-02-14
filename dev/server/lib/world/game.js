/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

var map_= require("./map.js");

exports.Game = function() {

    this.id = null;
    this.map = null;
    this.players = [];
    this.state = "waiting";

    this.mapFactory = null;
    this.playerFactory = null;
    this.unitFactory = null;


    // Configuration
    this.nbMaxPlayers = 2;
};

exports.Game.prototype = {

    //prend user en paramètre et instancie un player

    addPlayer: function(user) {
        var pl = this.playerFactory.createFromUser(user);
        this.players.push(pl);
        this.checkState();
        return pl;
    },

    getPlayersIds: function() {

        var playersIds = [];
        for (i=0 ; i<this.players.length ; i++) {
                playersIds[i] = this.players[i].id;
        }
        return playersIds;
    },

    checkState: function() {
        if (this.nbMaxPlayers == this.players.length) {
            this.state = "playing";
        }
        return this;
    },

    downloadMapFromFile: function(file) {
        this.map = mapFactory.createFromFile(file);
    },

    toJSON: function() {
        return {
            "id":       this.id,
            "players":  this.players,
            "map":      this.map,
            "state":    this.state,
        };
    },
};
