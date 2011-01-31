exports.WorldManager = function() {
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
        this.game = JSON.parse(data);
    },

    gameUpdate: function(data) {
        var obj = JSON.parse(data);
        updateValues(this.game, obj);
    },

    mapData: function(data) {
        this.game.map = JSON.parse(data);
    },

	mapUpdate: function(data) {
        var obj = JSON.parse(data);
        updateValues(this.game.map, obj);
    },
    
    playerData: function(data) {
        this.game.players.push(JSON.parse(data));
    },
    
    playerUpdate: function(data) {
        var obj = JSON.parse(data);
		var i = 0;
		while(i<this.game.players.length){
			if(this.game.players[i][id] == obj[id]){
				 updateValues(this.game.players[i], obj);
				 i = this.game.players.length;
				}
			i++;
			}
    },

    cellUpdate: function(data) {
        var newCell = JSON.parse(data);
        // Err !! celles un tableau de cell (y a pas 2 dimensions)
        this.game.map.cells[newCell.x][newCell.y] = newCell;
    },

    unitData: function(data) {
        var obj = JSON.parse(data);
        // obj = {idOfPlayer,unit}
		var i = 0;
		while(i<this.game.players.length){
			if(this.game.players[i][id] == obj[owner]){
				 this.game.players[i][units].push(obj);
				 i = this.game.players.length;
				}
			i++;
			}
    },

    unitUpdate: function(data) {
        var obj = JSON.parse(data);        
		var i = 0;
		while(i<this.game.players.length){
			if(this.game.players[i][id] == obj[owner]){
				
			var j = 0;
			while(j<this.game.players[i][units].length){
				if(this.game.players[i][units][j][id] == obj[id]){				 
					
					updateValues(game.players[i][units][j], obj);
				 	j = this.game.players[i][units].length;					
					}
				j++;
				}
				 i = this.game.players.length;
				}
			i++;
			}
    },

};
