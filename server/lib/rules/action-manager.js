/* *********************************************************************
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
 * @param game instance of the game
 * @constructor
 */
function ActionManager(game) {
    this.game = game ;
}

ActionManager.prototype = {

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

        var movement = this.game.map.getDistanceBetween(unit.cell, cell);

        //check the distance
        if( movement > unit.movement ) {
            util.log("ActionManager.moveUnit: Error - Unit has not enough movement to go to cell.");
            return false ;
        }

        //check if this cell is empty
        if( this.game.getUnitByCell(cell) != null ) {
            util.log("ActionManager.moveUnit: Error - This cell is not empty.");
            return false ;
        }

        //move the unit
        unit.setCell(cell) ;
        unit.setMovement(unit.movement - movement) ;

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
        if( !this.canPlay(player) ){
            util.log("ActionManager.attackUnit: Error - Player cannot play now.");
            return false ;
        }

        //check if the player owns the units
        if( !player.hasUnit(unitId) ) {
            util.log("ActionManager.attackUnit: Player doesn't own the unit.");
            return false ;
        }

        //check if the player doesn't own the target
        if( player.hasUnit(targetId) ){
            util.log("ActionManager.attackUnit: Player can't attack his own unit.");
            return false ;
        }

        //check the distance
        if( this.game.map.getDistanceBetween(unit.cell, target.cell) > unit.range ){
            util.log("ActionManager.attackUnit: Error - Unit has not enough movement to go to cell.");
            return false ;
        }

        //attack
        target.setHealth(target.health - unit.attack) ;

        //riposte
        if( this.game.map.getDistanceBetween(target.cell, unit.cell) <= target.range )
            unit.setHealth(unit.health - target.defense) ;

        return true ;
    },


    /**
     * check if the player can play
     * @return true if he can play, false otherwise
     */
    canPlay: function(player) {

        //TODO
        //return player.canPlay() ;

        return (this.game.currentPlayer.id == player.id) ;
    },


    /**
     * Finish turn of current player (before time out)
     * @param playerId Id of player who wants to end his turn
     */
    endTurn: function(playerId) {
        var player = this.game.getPlayer(playerId) ;

        //check if the player can play
        if( !this.canPlay(player) ) {
            util.log("ActionManager.endTurn: Error - It's not your turn.");
            return false ;
        }

        this.game.changeTurn();
    },

    /**
     * Abandon the game
     * @param playerId Id of player who wants to leave the game
     */
    abandon: function(playerId) {
        this.game.removePlayer(playerId);
    },

};

module.exports = ActionManager;
