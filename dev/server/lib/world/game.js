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
 * @authors Youness HAMRI - youness.hamri@gmail.com / Van Duc NGUYEN - ducnguyen272@yahoo.com
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
    this.nbMaxPlayers = null;
    this.nbMaxTurns = null;
    this.turnDuration = null;


    //play in turn
    this.currentPlayer = null;
    this.interval = null;
    this.nbPlayedTurns = -1;
};

exports.Game.prototype = {

    /**
     * Adds a new player to current game from an user .
     * @param user.
     * @return player.
     */
    addPlayer: function(user) {
        var player = this.playerFactory.createFromUser(user);
        player.startPoint = this.map.getStartPoints().shift();
        player.addObserver(this);
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
            this.notify({game: this});
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
        var nextPlayer = this.getNextPlayer(this.currentPlayer.turn);
        if(nextPlayer.turn <= this.currentPlayer.turn) {
            this.nbPlayedTurns++;
            if(this.nbPlayedTurns > this.nbMaxTurns) {
                this.stopPlaying();
                return;
            }
        }
        this.currentPlayer = nextPlayer;

        console.log("This is turn of player " + this.currentPlayer.turn);

        //Start timer for next player
        this.startTimer();
    },

    /**
     * Start Timer for playing in turn
     * (in miliseconds)
     */
    startTimer: function() {
        this.interval = setInterval(function() {
            this.nextTurn();
            clearInterval(this.interval);
        }.bind(this), this.turnDuration * 1000);
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
        this.nbPlayedTurns = 0;
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
        this.currentPlayer = null;
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

    onUpdate: function(context) {
        context.game = this;
        this.notify(context);
    },

};
