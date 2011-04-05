/* *********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

var util        = require("util"),
    Unit        = require("./unit.js"),
    Legacy      = require("../util/legacy.js"),
    Subject     = require("../util/subject.js");

var legacy = new Legacy();

/**
 * Class UnitFactory
 *
 * @author Youness HAMRI - youness.hamri@gmail.com / duc ....
 * @constructor
 */
function UnitFactory(gameEngine) {
    this.gameEngine = gameEngine;

    this.currentId = 0;
    this.types = [];

    // For testing purpose only
    this.addUnitType("choucroute", 100, 10, 10, 3, 2, 1, []);
}

UnitFactory.prototype = {

    /**
     * Create a new unit.
     * @param type, the type of unit.
     * @param owner, the player who has creating a unit
     * @param cell, the cell that will be occupied by the unit
     * @return myUnit: the created unit.
     */
    create: function(type, owner, cell) {

        util.log("UnitFactory.create: cell=" + cell);

        var myUnit = new Unit();

        myUnit.id = this.currentId;
        myUnit.type = type;
        myUnit.owner = owner;
        myUnit.cell = cell;

        if (this.types[type] == null) {
            console.log("le type de l'unité que vous voulez créer n'existe pas");
        }

        else {

            myUnit.health = this.types[type].health;
            myUnit.attack = this.types[type].attack;
            myUnit.defense = this.types[type].defense;
            myUnit.view = this.types[type].view;
            myUnit.nbMaxMovements = this.types[type].movement;
            myUnit.movement = myUnit.nbMaxMovements;
            myUnit.range = this.types[type].range;
            myUnit.properties = this.types[type].properties;

        }

        legacy.inherits(new Subject(), myUnit);

        this.currentId ++;
        return myUnit;
    },

    addUnitType : function(type, health, attack, defense, view, movement, range, properties) {

        var obj = {

            "health"    : health,
            "attack"    : attack,
            "defense"   : defense,
            "view"      : view,
            "movement"  : movement,
            "range"     : range,
            "properties": properties
        };

        if ( this.types[type] != null ) {
            console.log("Erreur : le type de l'unité existe déjà");
        }

        else {
            this.types[type] = obj;
        }
    },
}

module.exports = UnitFactory;
