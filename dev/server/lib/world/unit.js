/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/


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
}



var unit_ = require("./unit.js");
var newUnit = new unit_.Unit();


exports.Unit.prototype = {
    //add a new properties to unit

    addProperty : function(property) {
        this.properties.push(property);
        return this;
    },

    removeProperty : function(property) {

        var i=0;
        while (i < this.properties.length && this.properties[i] != property) {
            i++;
        }
        if ( i == this.properties.length ) {
            console.log("WARNING: aucune propriete à supprimer ");
        }
        else {
             this.properties.splice(i,1);
        }
        return this;
    },

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

    moveToCell : function(cell) {

        this.cell =  cell;

    },

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
            "cell" : this.cell
        }

        return data;
    },
}





