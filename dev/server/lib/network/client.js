var comm = require("./communication");

exports.Client = function(connectionData, serverNode) {
    this.conn = connectionData;
    this.server = serverNode;

    connectionData.addListener("message", function(msg)
    {
        //onMessage(msg);
	console.log("Message received: " + msg);
	comm.Communication.manageMessage(connectionData, serverNode, msg);
    });

    connectionData.addListener("close", function()
    {
        console.log("Connection " + connectionData.id + "closed");
    });
}

/*
exports.Client.prototype = {
    send: function(message) {
        server.send(conn.id, message);
    },
    onMessage: function(msg) {
	console.log("Message received: " + msg);
    }
}
*/
