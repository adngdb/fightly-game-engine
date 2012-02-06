Crafty.c("cell", {

    init: function() {
        // If the "clickable" component is not added to this one, then add it
        if (!this.has("clickable")) {
            this.addComponent("clickable");
        }
        return this;
    },

    cell: function(x, y, eventManager) {
        this.cell = {
            x: x,
            y: y,
            eventManager: eventManager
        };
        return this;
    },

});
