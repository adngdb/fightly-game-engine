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
    gameData: function(data) {
        this.game = JSON.parse(data);
    },

    mapData: function(data) {
        this.game.map = JSON.parse(data);
    },

    playersData: function(data) {
        this.game.players = JSON.parse(data);
    },

    cellUpdate: function(data) {
        var newCell = JSON.parse(data);
        this.game.map.cells[newCell.x][newCell.y] = newCell;
    },

};
