/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

/**
 * Class WorldManager
 * @authors Ilyas BOUTEBAL - boutebal_ilyas@yahoo.fr
 * */

WorldManager = function() {
    this.game = null;
    this.player = null;
};

WorldManager.prototype = {

    /**
     * Update the objet "o1" from the second object "o2"
     * @return this
     */
    updateValues: function (o1,o2) {
        for (var propertyName in o2) {
            o1[propertyName] = o2[propertyName];
        }
    },

    /**
     * Create game object
     * @param data
     */
    gameData: function(data) {
        this.game = data;
    },

    /**
     * Update game object
     * @param data
     */
    gameUpdate: function(data) {
        this.updateValues(this.game, data);
    },

    /**
     * Create the map
     * @param data
     */
    mapData: function(data) {
        this.game.map = data;
    },

    /**
     * Update the map
     * @param data
     */
    mapUpdate: function(data) {
        this.updateValues(this.game.map, data);
    },

    /**
     * Create the player
     * @param data
     */
    playerData: function(data) {
        this.game.players.push(data);
    },

    /**
     * Update the player
     * @param data
     */
    playerUpdate: function(data) {
        var i = 0;
        while(i<this.game.players.length){
            if(this.game.players[i].id == data.id){
                 this.updateValues(this.game.players[i], data);
                 i = this.game.players.length;
                }
            i++;
            }
    },

    /**
     * Create A unit
     * @param data
     */
    unitCreate: function(data) {
        var i = 0;
        while(i<this.game.players.length){
            if(this.game.players[i].id == data.owner){
                 this.game.players[i].units.push(data);
                 i = this.game.players.length;
                }
            i++;
            }
    },

    /**
     * Update a Unit
     * @param data
     */
    unitUpdate: function(data) {
        var i = 0;
        while(i<this.game.players.length){
            if(this.game.players[i].id == data.owner){
            var j = 0;
            while(j<this.game.players[i].units.length){
                if(this.game.players[i].units[j].id == data.id){
                    this.updateValues(this.game.players[i].units[j], data);
                    j = this.game.players[i].units.length;
                    }
                j++;
                }
                 i = this.game.players.length;
                }
            i++;
            }
    },


    /**
     * checks if a player is playing or not
     * @param data
     */
    amIPlaying: function() {
        return (this.game.currentPlayer == this.player);
    },

};
