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

    addProperties : function(propertie) {
        this.properties.push(propertie);
        return this;
    },

    removeProperties : function(propertie) {

        var i=0;
        while (i < this.properties.length && this.properties[i] != propertie) {
            i++;
        }
        if ( i == this.properties.length ) {
            console.log("WARNING: aucune propriete à supprimer ");
        }
        else {
             this.properties[i] = null;
        }
        return this;
    },

    hasProperties : function(propertie) {

        var i=0;
        while (i < this.properties.length && this.properties[i] != propertie) {
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





