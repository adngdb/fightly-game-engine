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
    //add a new player
    addPlayer : function(player){
        this.players.push(player);
    },

    //prend user en parametre et instancie un player

    /*addPlayer : function() {


    }*/

    getPlayersIds : function() {

        var playersIds = [];
        for (i=0 ; i<this.players.length ; i++) {
                playersIds[i] = this.players[i].id;
        }
        return playersIds;
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
