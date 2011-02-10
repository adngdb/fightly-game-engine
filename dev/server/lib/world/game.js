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

    this.id = -1;
    this.players = [];
    this.map = null;
    this.playerFactory = null;
    this.mapFactory = null;
    this.unitFactory = null;


}

exports.Game.prototype = {

    //prend user en paramètre et instancie un player

    addPlayer : function(user) {

        pl = this.playerFactory.createFromUser(user);
        this.players.push(pl);
    },

    addPlayer : function(id,name) {

        pl = this.playerFactory.create(id,name);
        this.players.push(pl);
    },

    getPlayersIds : function() {

        var playersIds = [];
        for (i=0 ; i<this.players.length ; i++) {
                playersIds[i] = this.players[i].id;
        }
        return playersIds;
    },

    downloadMapFromFile : function(file) {
            this.map = mapFactory.createFromFile(file);
    },


    toJSON : function() {

        var data = {
            "id": this.id,
            "players" : this.players,
            "map" : this.map
        };

        return data;
    },
}
