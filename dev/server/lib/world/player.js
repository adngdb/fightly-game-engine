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

    /**
     * Create a new unit for player : assign a movement value to the unit and notify it.
     * @param type. the type of unit
     * @return unit. the player unit
     */
    addUnit: function(type) {

        util.log("Player.addUnit: startPoint=" + this.startPoint);

        var unit = this.unitFactory.create(type, this, this.startPoint);

        unit.addObserver(this);
        this.units.push(unit);

        this.notify({object: "Player", modified: "units", instance: this});

        return unit;
    },

    /**
     * checks if the player has a unit
     * @param unitId. the unit identity
     * @return boolean. returns true if the player has this unit, and returns false otherwise.
     */
    hasUnit: function(unitId) {
        for (var i = 0; i < this.units.length; i++) {
            if (this.units[i].id == unitId)
                return true ;
        }
        return false;
    },

    /**
     * Transform the player attributs to a JSON string
     * @return the JSON string.
     */
    toJSON : function() {
        return {
            "id": this.id,
            "name": this.name,
            "turn": this.turn,
            "units": this.units,
        };
    },

    /**
     * Notify any change in the context
     * @param context. The player context.
     */
    onUpdate: function(context) {
        context.player = this;
        this.notify(context);
    },

    /**
     * Assign the maximun movement value to the player units.
     */
    resetUnits: function() {
        for(var i=0;i<this.units.length;i++) {
              this.units[i].resetMovement();
        }
    }
};


