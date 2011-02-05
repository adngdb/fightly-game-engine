/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

var util = require("util");

exports.Player = function() {
    this.id = null;
    this.name = null;
    this.turn = null;
    this.units = [];
    this.startPoint = {type : null , x :null , y:null};
    this.play = false;

    this.startPoint = null;

    this.unitFactory = null;
};

exports.Player.prototype = {

    addUnit: function(type) {

        util.log("Player.addUnit: startPoint=" + this.startPoint);

        var unit = this.unitFactory.create(type, this, this.startPoint);

        unit.addObserver(this);
        this.units.push(unit);

        this.notify({object: "Player", modified: "units", player: this});

        return unit;
    },

    hasUnit: function(unitId) {
        for (var i = 0; i < this.units.length; i++) {
            if (this.units[i].id == unitId)
                return true ;
        }
        return false;
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

    resetUnits: function() {
        for(var i=0;i<this.units.length;i++) {
              this.units[i].resetMovement();
        }
    }
};


