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

    this.play = false;

    this.unitFactory = null;
};

exports.Player.prototype = {

    addUnit: function(type) {
        var unit = this.unitFactory.create(type, this, null);
        unit.addObserver(this);
        this.units.push(unit);

        this.notify({object: "Player", modified: "units", player: this});

        return unit;
    },

    toJSON : function() {
        return {
            "id": this.id,
            "name": this.name,
            "turn": this.turn,
            "units": this.units,
        };
    },

    onUpdate: function(context) {
        context.player = this;
        this.notify(context);
    },

};


