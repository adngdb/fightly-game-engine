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
    this.name = null;
    this.owner = null;
    this.type = null;
    this.attack = null;
    this.defense = null;
    this.view = null;
    this.movement = null;
    this.properties = [];
    this.cell = null;
    this.health = null;
    this.range = null;
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
        this.notify({object: "Unit", modified: "cell", unit: this});

    },

    /**
     * Transform the unit attributs to a JSON string
     * @return data, contains the unit attributs.
     */
    toJSON : function() {

        var data = {
            "id" : this.id ,
            "name": this.name,
            "owner": this.owner.id,
            "type" : this.type,
            "attack" :this.attack,
            "defense": this.defense,
            "view" : this.view,
            "movement" : this.movement,
            "properties": this.properties,
            "cell" : this.cell,
            "health" : this.health,
            "range" : this.range,
        }

        return data;
    },
}





