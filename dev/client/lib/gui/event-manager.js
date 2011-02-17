function EventManager(world, comManager, messageBuilder) {

    this.world = world;
    this.comManager = comManager;
    this.messageBuilder = messageBuilder;

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
        return this;
    },


    deselect: function() {
        this.selected = null;
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
