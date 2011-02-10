/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/


var unit_ = require("./unit.js");


exports.UnitFactory = function() {
    this.currentId = 0;
}

exports.UnitFactory.prototype = {

    create: function(name,owner) {

        var myUnit = new unit_.Unit();

        myUnit.id = this.currentId;
        myUnit.name = name;
        myUnit.owner = owner;
        // On doit initialiser l'emplacement par défaut de l'unite sur la carte en fonction du tour du joueur,
        // Il faut pas oublié de tester le type de case
        // var xInit = ..turn
        // var yInt = ..
        //myUnit.cell = owner.turn...;

        this.currentId ++;
        return myUnit;
    },
}
