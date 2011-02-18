/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

/**
 * Class Unit
 * @authors Youness HAMRI - youness.hamri@gmail.com
 **/

exports.Unit = function() {

    this.id = -1;
    this.owner = null;
    this.cell = null;
    this.type = null;
    this.health = null;
    this.range = null;
    this.attack = null;
    this.defense = null;
    this.view = null;
    this.movement = null;
    this.properties = [];

    this.nbMaxMovements = null;
}

exports.Unit.prototype = {

    /**
     * Adds a new properties to unit.
     * @param property.
     * @return this.
     */
    addProperty : function(property) {
        this.properties.push(property);
        return this;
    },

    /**
     * Removes one property from a properties list.
     * @param property.
     * @return this.
     */
    removeProperty : function(property) {

        var i=0;
        while (i < this.properties.length && this.properties[i] != property) {
            i++;
        }
        if ( i == this.properties.length ) {
            console.log("WARNING: aucune propriété à supprimer ");
        }
        else {
             this.properties.splice(i,1);
        }
        return this;
    },

    /**
     * checks whether a property is present in the list of properties
     * @param property.
     * @return true when a properties list contains a property and return false otherwise .
     */
    hasProperty : function(property) {

        var i=0;
        while (i < this.properties.length && this.properties[i] != property) {
            i++;
        }

        if ( i == this.properties.length ) {
            return false;
        }
        else {
            return true;
        }
    },

    /**
     * Moves the unit to another cell,
     * @param cell. a new cell that will contains the unit.
     */
    moveToCell : function(cell) {

        this.cell =  cell;
        this.notify({object: "Unit", modified: "cell", instance: this});

    },

    /**
     * Transform the unit attributs to a JSON string
     * @return data, contains the unit attributs.
     */
    toJSON : function() {

        var data = {
            "id" : this.id ,
            "owner": this.owner.id,
            "cell" : this.cell,
            "type" : this.type,
            "health" : this.health,
            "range" : this.range,
            "attack" :this.attack,
            "defense": this.defense,
            "view" : this.view,
            "movement" : this.movement,
            "properties": this.properties
        }

        return data;
    },

    /**
     * The cell setter: assign a cell to the unit and notify it.
     * @param cell.
     */
    setCell : function(cell) {
        this.cell = cell;
        this.notify({object: "Unit", modified: "cell", instance: this});
    },

    /**
     * The health setter: assign a health value to the unit and notify it.
     * @param health.
     */
    setHealth : function(health) {
        this.health = health;
        this.notify({object: "Unit", modified: "health", instance: this});
    },

    /**
     * The view setter: assign a view value to the unit and notify it.
     * @param view.
     */
    setView : function(view) {
        this.view = view;
        this.notify({object: "Unit", modified: "view", instance: this});
    },

    /**
     * The movement setter: assign a movement value to the unit and notify it.
     * @param movement.
     */
    setMovement : function(movement) {
        this.movement = movement;
        this.notify({object: "Unit", modified: "movement", instance: this});

    },

    /**
     * The range setter: assign a range value to the unit and notify it.
     * @param range.
     */
    setRange : function(range) {
        this.range = range;
        this.notify({object: "Unit", modified: "range", instance: this});
    },

    /**
     * The defense setter: assign a defense value to the unit and notify it.
     * @param defense.
     */
    setDefense : function(defense) {
        this.defense = defense;
        this.notify({object: "Unit", modified: "defense", instance: this});
    },

    /**
     * The defense attack: assign a attack value to the unit and notify it.
     * @param attack.
     */
    setAttack : function(attack) {
        this.attack = attack;
        this.notify({object: "Unit", modified: "attack", instance: this});
    },

    /**
     * Assign the maximun movement value to the unit.
     */
    resetMovement : function() {
        this.setMovement(this.nbMaxMovements);
    }
}



