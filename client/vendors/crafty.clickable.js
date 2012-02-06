Crafty.c("clickable", {

    init: function() {
        // If the "mouse" component is not added to this one, then add it
        if (!this.has("mouse")) {
            this.addComponent("mouse");
        }
        // If the "controls" component is not added to this one, then add it
        if (!this.has("controls")) {
            this.addComponent("controls");
        }
        return this;
    },

    clickable: function(polygon, callback) {
        this.areaMap(polygon).bind("mousedown", callback);
        return this;
    },

});
