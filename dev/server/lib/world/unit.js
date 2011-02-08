// Unit Class

exports.Unit = function() {

    this.id = -1;
    this.name = null;
    this.owner;
    this.type = null;
    this.attack = null;
    this.defense = null;
    this.view = null;
    this.move = null;
    this.properties = [];
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

    toJSON : function() {
        var data = {
            "id" : this.id ,
            "name": this.name,
            "owner": this.owner.id,
            "type" : this.type,
            "attack" :this.attack,
            "defense": this.defense,
            "view" : this.view,
            "move" : this.move,
            "properties": this.properties
        };

        var st =  JSON.stringify(data);
        return st;
    },
}





