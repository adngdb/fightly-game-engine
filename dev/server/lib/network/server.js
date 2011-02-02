var sys = require("sys"),
    http = require('http'),
    io = require('socket.io'),

    client = require("./client"),
    actionManager = require("./action-manager");

exports.Server = function() {
    this.server = http.createServer(function(req, res){});
    this.socket = io.listen(this.server);
	
    var me = this;
    this.socket.on('connection', function(conn){
	me.onConnect(conn);
    });
}

exports.Server.prototype = {
    listen : function(port){
	this.server.listen(port);
	sys.log("Server created. Listening on port " + port + ".");
    },
    
    onConnect : function(connection) {
	sys.log("New connection: " + connection.sessionId);   
    	new client.Client(connection);
    }
}

