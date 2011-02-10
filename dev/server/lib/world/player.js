/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

exports.Player = function() {
    this.id = null;
    this.name = null;
    this.turn = null;
    this.units = [];
};

exports.Player.prototype = {

    toJSON : function() {
        return {
            "id": this.id,
            "name": this.name,
            "turn": this.turn,
            "units": this.units,
        };
    },

};


