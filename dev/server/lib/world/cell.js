// Cell class


exports.Cell = function() {
    this.type = null; // plains, mountain, swamp
    this.x = -1;
    this.y = -1;
}

exports.Cell.prototype = {

    toJSON : function() {

        var data = {
            "type": this.type,
            "x" : this.x ,
            "y" : this.y,
        };

        return JSON.stringify(data);
    },
}
