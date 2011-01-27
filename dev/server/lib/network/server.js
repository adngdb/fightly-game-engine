var sys = require("sys"),
    ws  = require("websocket-server"),
    client = require("./client"),
    actionManager = require("./action-manager");

exports.Server = function() {
    this.server = ws.createServer();
    actionManager.ActionManager.server = this.server;

    var me = this;
    this.server.addListener("connection", function(connectionData){
        me.onConnect(connectionData);
    });
}

exports.Server.prototype = {
    listen : function(port){
        this.server.listen(port);
        sys.log("Server created. Listening on port " + port + ".");
    },

    onConnect : function(connectionData) {
        sys.log("New connection: " + connectionData.id);
        new client.Client(connectionData, this.server);
    }
}





