var sys = require("sys"),
    am = require("./action-manager");

exports.Client = function(connectionData, serverNode) {

    //in many cases: "this" is a DOM object
    var me = this;
    me.conn = connectionData;
    me.server = serverNode;
    
    
    me.conn.addListener("message", function(msg)
    {
        me.onMessage(me.conn, me.server, msg);
    });

    me.conn.addListener("close", function()
    {
        sys.log("Connection " + me.conn.id + "closed");
    });
}


exports.Client.prototype = {
/*    send: function(message) {
        this.server.send(this.conn.id, message);
    },
*/
    onMessage: function(connectionData, server, msg) {
	sys.log("Message received: " + msg);
	am.ActionManager.manageMessage(connectionData, server, msg);
    }
}

