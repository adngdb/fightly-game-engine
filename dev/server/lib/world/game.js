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

    //play in turn
    this.currentPlayer = null;
    this.interval = null;
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

    //play in turn
    getPlayerByTurn: function(turn) {
	var player = null;
	for (var i=0 ; i<this.players.length ; i++) {
            if(this.players[i].turn == turn) {
		player = this.players[i];
		break;    
	    }
        }
	
	return player;
    }

    getNextPlayer: function(currentTurn) {
	var nextPlayer = null;
	while(nextPlayer == null) {
	    currentTurn++;
	    if(currentTurn >= this.nbMaxPlayers) {
		currentTurn = 0;
	    }
	
  	    nextPlayer = this.getPlayerByTurn(currentTurn);
	}

	return nextPlayer;
    }

    nextTurn: function() {
	var currentTurn = this.currentPlayer.turn;
	this.currentPlayer = this.getNextPlayer(currentTurn);
	console.log("This is turn of player " + this.currentPlayer.turn);

	//Start timer for next player	
	this.startTimer();
    },
    
    startTimer: function() {
	this.interval = setInterval(function() {
	    clearInterval(this.interval);
	    this.nextTurn();
	}, 5000).bind(this);
    }

    changeTurn: function() {
	clearInterval(this.interval);
	this.nextTurn();
    },

    startPlaying: function() {
	this.currentPlayer = this.getPlayerByTurn(0);
	console.log("This is turn of player 0");

	this.startTimer();
    }

    stopPlaying: function() {
	clearInterval(this.interval);
	setTurn(-1);
    },

    getPlayerById: function(id) {
	var player = null;
	for (var i=0 ; i<this.players.length ; i++) {
            if(this.players[i].id == id) {
		player = this.players[i];
		break;    
	    }
        }
	
	return player;
    }     
};
