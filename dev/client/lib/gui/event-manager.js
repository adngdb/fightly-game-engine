function EventManager(world, comManager, messageBuilder) {

    this.world = world;
    this.comManager = comManager;
    this.messageBuilder = messageBuilder;

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

};
