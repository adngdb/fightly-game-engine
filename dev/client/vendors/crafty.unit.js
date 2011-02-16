Crafty.c("unit", {

    init: function() {
        // If the "clickable" component is not added to this one, then add it
        if (!this.has("clickable")) {
            this.addComponent("clickable");
        }
        return this;
    },

    unit: function(id, eventManager) {
        this.unit = {
            id: id,
            eventManager: eventManager
        };
        return this;
    },

});
