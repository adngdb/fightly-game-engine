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

    this.mapFactory = null;
    this.playerFactory = null;
    this.unitFactory = null;

    this.map = null;
    this.players = [];

    this.state = "waiting";

    // Configuration
    this.nbMaxPlayers = 2;

    this.turn = -1;
    this.interval = -1;
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

    //play in turns
    getTurn: function() {
	return this.turn;
    },

    setTurn: function(newTurn) {
	this.turn = newTurn;
    },

    nextTurn: function() {
	var currentTurn = this.getTurn();
	var newTurn = (currentTurn + 1) % this.players.length;
	this.setTurn(newTurn);
	console.log("This is turn of " + newTurn);
	//Start timer for next player (player[newTurn]);
	
	this.interval = setInterval(function() {
		clearInterval(this.interval);
		this.nextTurn();
	}, 5000).bind(this);
    },

    changeTurn: function() {
	clearInterval(this.interval);
	this.nextTurn();
    },

    startPlaying: function(){
	this.nextTurn();
    }  
};
