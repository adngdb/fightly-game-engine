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

    create: function(id,name,owner,type,attack,defense,view,movement,properties) {

        var myUnit = new unit_.Unit();

        myUnit.name = name;
        myUnit.owner = owner;
        myUnit.type = type;
        myUnit.attack = attack;
        myUnit.defense = defense;
        myUnit.view = view;
        myUnit.movement = movement;
        myUnit.properties = properties;

        this.currentId ++;
        return myUnit;
    },

}
