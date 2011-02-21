/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

/**
 * Class EventManager
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 * @constructor
 */
function EventManager(gameEngine) {

    this.gameEngine = gameEngine;
    this.world = gameEngine.world;
    this.comManager = gameEngine.comManager;
    this.messageBuilder = gameEngine.messageBuilder;

    this.selected = null;

};

EventManager.prototype = {

    bindAll: function() {
        this.bindEndTurnBtn();
    },

    bindEndTurnBtn: function() {
        var btn = $("#end-turn-action");
        btn.click(function(e) {
            e.preventDefault();
            this.comManager.send(this.messageBuilder.createEndTurnAction());
        }.bind(this));
        return this;
    },

    select: function(item) {
        this.selected = item;
        console.log("Select item: "+item);
        this.gameEngine.invalidate();
        return this;
    },


    deselect: function() {
        this.selected = null;
        this.gameEngine.invalidate();
        return this;
    },


    isUnitSelected: function() {
        if (this.selected == null) {
            return false;
        }

        return true;
    },

    onCellClick: function() {
        console.log("onCellClick");
        var em = this.cell.eventManager;

        if (em.isUnitSelected()) {
            var msg = em.messageBuilder.createMoveUnitAction( em.selected.id, this.cell.x, this.cell.y );
            em.comManager.send( msg );
            em.deselect();
        }
    },

    onUnitClick: function() {
        console.log("onUnitClick");
        var em = this.unit.eventManager;

        if (em.isUnitSelected()) {
            if(em.selected.id == this.unit.id) {
                em.deselect();
            }else{
                    var msg = em.messageBuilder.createAttackUnitAction( em.selected.id, this.unit.id);
                    em.comManager.send( msg );
                 }
        }
        else {
             em.select(this.unit);
        }
    },

};
