/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 * @author Maxime COLIN
 *
 **********************************************************************/

var util = require('util');

/**
 * Manage the actions
 * @author Maxime COLIN
 * @param Game game instance de la partie
 */
exports.ActionManager = function(game) {
    this.game = game ;
}

exports.ActionManager.prototype = {

    /**
     * Move a unit to a cell
     * @param string unitId id of the unit
     * @param int cellX x coord of the cell
     * @param int cellY y coord of the cell
     * @return true if the action succeed, false otherwise
     */
    moveUnit: function(playerId,unitId,cellX,cellY) {

        var unit = this.game.getUnit(unitId) ;
        util.log("ActionManager.moveUnit: unit=" +unit);
        var cell = this.game.getCell(cellX,cellY) ;
        var player = this.game.getPlayer(playerId) ;

        //check if the player can play
        if( !this.canPlay(player) ) {
            util.log("ActionManager.moveUnit: Error - Player cannot play now.");
            return false ;
        }

        //check if the player owns the unit
        if( !player.hasUnit(unitId) ) {
            util.log("ActionManager.moveUnit: Error - Player doesn't own the unit.");
            return false ;
        }

        //check the distance
        if( this.game.map.getDistanceBetween(unit.cell, cell) > unit.movement ) {
            util.log("ActionManager.moveUnit: Error - Unit has not enough movement to go to cell.");
            return false ;
        }

        //move the unit
        unit.setCell(cell) ;
        unit.setMovement(unit.movement - 1) ;

        return true ;
    },


    /**
     * Attack a target with a unit
     * @param string playerId id of the player
     * @param string unitId id of the unit
     * @param string targetId id of the target
     * @return true if the action succeed, false otherwise
     */
    attackUnit: function(playerId,unitId,targetId) {

        var unit = this.game.getUnit(unitId) ;
        var target = this.game.getUnit(targetId) ;
        var player = this.game.getPlayer(playerId) ;

        //check if the player can play
        if( !this.canPlay(playerId) )
            return false ;

        //check if the player owns the units
        if( !player.hasUnit(unitId) )
            return false

        //check if the player doesn't own the target
        if( player.hasUnit(targetUnit) )
            return false ;

        //check the distance
        if( this.game.map.getDistanceBetween(unit.cell, target.cell) > unit.reach )
            return false ;

        //attack
        unit.attack(target) ;

        //riposte
        if( this.game.map.getDistanceBetween(target.cell, unit.cell) <= target.reach )
            target.attack(unit) ;

        return true ;
    },


    /**
     * check if the player can play
     * @return true if he can play, false otherwise
     */
    canPlay: function(player) {

        //TODO
        //return player.canPlay() ;

        return true ;
    }

}
