var sys = require("sys"),
    http = require('http'),
    io = require('socket.io'),

    client_ = require("./client"),
    am_ = require("./message-builder");

exports.ComManager = function() {
    this.server = http.createServer(function(req, res){});
    this.socket = io.listen(this.server);

    this.actionManager = new am_.ActionManager();

    var me = this;
    this.socket.on('connection', function(conn){
    me.onConnect(conn);
    });
}

exports.ComManager.prototype = {
    listen : function(port){
    this.server.listen(port);
    sys.log("Server created. Listening on port " + port + ".");
    },

    onConnect : function(connection) {
    sys.log("New connection: " + connection.sessionId);
        new client_.Client(connection, this);
    }
}

