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

    this.actionManager = null;

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

    removePlayer: function(playerId) {
        for (var i=0 ; i<this.players.length ; i++) {
            if(this.players[i].id == playerId) {
                this.players[i].play = false;
                break;
            }
        }
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
    },

    getNextPlayer: function(currentTurn) {
        var nextPlayer = null;
        do {
            currentTurn++;
            if(currentTurn >= this.nbMaxPlayers) {
                currentTurn = 0;
            }

            nextPlayer = this.getPlayerByTurn(currentTurn);
        }
        while(nextPlayer.play == false);

        return nextPlayer;
    },

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
        }.bind(this), 5000);
    },

    changeTurn: function() {
        clearInterval(this.interval);
        this.nextTurn();
    },

    startPlaying: function() {
        this.currentPlayer = this.getPlayerByTurn(0);
        console.log("This is turn of player 0");

        this.startTimer();
    },

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

    getUnitById: function(id) {
        for(var i=0; i<this.players.length; i++) {
            for(var j=0; j<this.players[i].units.length; j++) {
                if(this.players[i].units[j].id == id) {
                    return this.players[i].units[j];
                }
            }
        }

        return null;
    },

    getCell: function(x, y) {
        var cell = null;
        for (var i=0 ; i<this.map.cells.length ; i++) {
            if(this.map.cells[i].x == x && this.map.cells[i].y == y) {
                cell = this.this.map.cells[i];
                break;
            }
        }

        return player;
    },
};
