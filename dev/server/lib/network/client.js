var sys = require("sys"),
    actionManager_ = require("./action-manager.js");

exports.Client = function(connectionData, serverNode) {
    
    this.conn = connectionData;
    this.server = serverNode;

    //in many cases: "this" is a DOM object
    var me = this;
    this.conn.addListener("message", function(msg) {
        me.onMessage(msg);
    });

    this.conn.addListener("close", function() {
        sys.log("Connection " + me.conn.id + "has closed");
    });
}


exports.Client.prototype = {

    send: function(message) {
        this.server.send(this.conn.id, message);
    },

    onMessage: function(msg) {
        sys.log("Message received: " + msg);
        actionManager_.ActionManager.manageMessage(this.conn, this.server, msg);
    },
}

