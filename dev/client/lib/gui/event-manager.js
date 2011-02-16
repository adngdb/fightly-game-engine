function EventManager(world, comManager, messageBuilder) {

    this.world = world;
    this.comManager = comManager;
    this.messageBuilder = messageBuilder;

    this.selected = null;

};

EventManager.prototype = {

    bindAll: function() {
        this.bindTestMoveBtn();
    },

    bindTestMoveBtn: function() {
        var btn = $("#move-test-action");
        btn.click(function(e) {
            e.preventDefault();
            var unit = this.world.game.players[0].units[0];
            var cell = this.world.game.map.cells[1][0];
            this.comManager.send(this.messageBuilder.createMoveUnitAction(unit.id, cell.x, cell.y));
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

        em.select(this.unit);
    },

};
