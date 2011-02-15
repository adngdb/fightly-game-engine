/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

var map_= require("./map.js");

/**
 * Class Game
 * @authors Youness HAMRI - youness.hamri@gmail.com / duc ....
 * */

exports.Game = function() {

    this.id = null;
    this.map = null;
    this.players = [];
    this.state = "waiting";

    this.mapFactory = null;
    this.playerFactory = null;
    this.unitFactory = null;

    // Configuration
    this.nbMaxPlayers = -1;
    this.nbMaxTurns = -1;
    this.turnDuration = -1;
    //play in turn
    this.currentPlayer = null;
    this.interval = null;
};

exports.Game.prototype = {

    /**
     * Adds a new player to current game from an user .
     * @param user.
     * @return player.
     */
    addPlayer: function(user) {
        var player = this.playerFactory.createFromUser(user);
        this.players.push(player);
        this.checkState();
        return player;
    },

    /**
     * Set to false a play attribute of player.
     * @param PlayerId (a player identity)
     */
    removePlayer: function(playerId) {
        for (var i=0 ; i<this.players.length ; i++) {
            if(this.players[i].id == playerId) {
                this.players[i].play = false;
                break;
            }
        }
    },

    /**
     * Get a game list of players identities.
     * @return PlayersIds
     */
    getPlayersIds: function() {

        var playersIds = [];
        for (i=0 ; i<this.players.length ; i++) {
                playersIds[i] = this.players[i].id;
        }
        return playersIds;
    },

    /**
     * Launchs the game when a maximum number of players is reached
     * @return this
     */
    checkState: function() {
        if (this.nbMaxPlayers == this.players.length) {
            this.state = "playing";
        }
        return this;
    },

    /**
     * Downloads one map from a data map file
     * @param file
     */
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


    //--->play in turn

    /**
     * Get a player by attribut "turn"
     * @param turn Turn of player
     * @return player
     */
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

    /**
     * Get player who has next turn
     * @param currentTurn Turn of current player
     * @return player
     */
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

    /**
     * Change turn to the next player (according to Timer)
     */
    nextTurn: function() {
        var currentTurn = this.currentPlayer.turn;
        this.currentPlayer = this.getNextPlayer(currentTurn);
        console.log("This is turn of player " + this.currentPlayer.turn);

        //Start timer for next player
        this.startTimer();
    },

    /**
     * Start Timer for playing in turn
     */
    startTimer: function() {
        this.interval = setInterval(function() {
            this.nextTurn();
            clearInterval(this.interval);
        }.bind(this), 5000);
    },

    /**
     * Change turn to the next player (immediately)
     */
    changeTurn: function() {
        clearInterval(this.interval);
        this.nextTurn();
    },

    /**
     * Start playing in turn
     * Player whose turn is 0 will be the first
     */
    startPlaying: function() {
        this.currentPlayer = this.getPlayerByTurn(0);
        console.log("This is turn of player 0");

        this.startTimer();
    },

    /**
     * Stop playing
     *
     */
    stopPlaying: function() {
        clearInterval(this.interval);
        setTurn(-1);
    },

    /**
     * Get a player by attribut "id"
     * @param id Id of player
     * @return player
     */
    getPlayerById: function(id) {
        var player = null;
        for (var i=0 ; i<this.players.length ; i++) {
            if(this.players[i].id == id) {
                player = this.players[i];
                break;
            }
        }

        return player;
    },

    /**
     * Alias for getPlayerById
     * @see getPlayerById
     */
    getPlayer: function(id) {
        return this.getPlayerById(id);
    },

    /**
     * Get a unit by attribut "id" in game
     * @param id Id of unit
     * @return unit
     */
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

    /**
     * Alias for getUnitById
     * @see getUnitById
     */
    getUnit: function(id) {
        return this.getUnitById(id);
    },

    /**
     * Get a cell by coodinates x and y
     * @param x Coordinate x of this cell
     * @param y Coordinate y of this cell
     * @return cell
     */
    getCell: function(x, y) {
        var cell = null;
        for (var i=0 ; i<this.map.cells.length ; i++) {
            if(this.map.cells[i].x == x && this.map.cells[i].y == y) {
                cell = this.this.map.cells[i];
                break;
            }
        }

        return cell;
    },
};
