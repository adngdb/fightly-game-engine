/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

var sys = require("sys"),
    http = require('http'),
    io = require('socket.io'),

    client_ = require("./client"),
    messageBuilder_ = require("./message-builder");

exports.ComManager = function(gameEngine) {

    this.gameEngine = gameEngine;

    this.server = http.createServer(function(req, res){});
    this.socket = io.listen(this.server);

    this.socket.on('connection', function(conn){
        this.onConnect(conn);
    }.bind(this));

}

exports.ComManager.prototype = {

    listen : function(port){
        this.server.listen(port);
        sys.log("Server created. Listening on port " + port + ".");
    },

    onConnect : function(connection) {
        sys.log("New connection: " + connection.sessionId);
        new client_.Client(connection, this, this.gameEngine);
    },

}
