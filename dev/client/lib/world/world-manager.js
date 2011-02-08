/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/


WorldManager = function() {
    this.game = null;
};

WorldManager.prototype = {

    /**
     * data must contain following information:
     *      height
     *      width
     *      ...
     */
// Function for updating the object o1 from the object o2
    updateValues: function (o1,o2) {
        for (var propertyName in o2) {
            o1[propertyName] = o2[propertyName];
        }
    },

    gameData: function(data) {
        this.game = data;
    },

    gameUpdate: function(data) {
        this.updateValues(this.game, data);
    },

    mapData: function(data) {
        this.game.map = data;
    },

    mapUpdate: function(data) {
        this.updateValues(this.game.map, data);
    },

    playerData: function(data) {
        this.game.players.push(data);
    },

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
/*
    cellUpdate: function(data) {
        var newCell = JSON.parse(data);
        // Err !! celles un tableau de cell (y a pas 2 dimensions)
        this.game.map.cells[newCell.x][newCell.y] = newCell;
    },
*/
    unitData: function(data) {
        var i = 0;
        while(i<this.game.players.length){
            if(this.game.players[i].id == data.owner){
                 this.game.players[i].units.push(data);
                 i = this.game.players.length;
                }
            i++;
            }
    },

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

};
