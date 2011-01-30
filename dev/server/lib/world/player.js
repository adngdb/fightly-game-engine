// Player Class

exports.Player = function() {
    this.id = -1;
    this.name = null;
    this.turn = -1;
    this.units = [];
}



exports.Player.prototype = {

    toJSON : function() {

        var data = {
                "id" : this.id,
                "name" : this.name,
                "turn" : this.turn,
                "units" : this.units
           }

        return JSON.stringify(data);
    },
}



/*var player_ = require("./player.js");
var newPlayer = new player_.Player();
console.log("////////////////////////////  " + newPlayer.id + me.name);
console.log("%%%%%%%%% " + newPlayer.toJSON());
*/

