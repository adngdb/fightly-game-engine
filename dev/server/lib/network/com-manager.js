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

/**
 * Class ComManager
 *
 */

exports.ComManager = function(gameEngine) {

    this.gameEngine = gameEngine;

    this.server = http.createServer(function(req, res){});
    this.socket = io.listen(this.server);

    this.clients = [];

    this.socket.on('connection', function(conn){
        this.onConnect(conn);
    }.bind(this));

}

exports.ComManager.prototype = {

    /*
     * Server listens on a port
     * @param port: Port Number
     * @return this
     */
    listen : function(port){
        this.server.listen(port);
        sys.log("Server created. Listening on port " + port);
        return this;
    },


    /*
     * Create a connection which is correspondant with a Client
     * @param connection Socket Connection of a Client
     * @return this
     */
    onConnect : function(connection) {
        sys.log("New connection: " + connection.sessionId);
        this.clients[connection.sessionId] = new client_.Client(connection, this, this.gameEngine);
        return this;
    },

    /**
     * Send a message to a client or a group of clients.
     * @param to Can be a client ID or an array of client ID.
     * @param message Message to send to each specified client.
     * @return this
     */
    send: function(to, message) {
        // If to is an array, send message to all specified clients.
        if (to instanceof Array) {
            var i = 0, l = to.length;
            for (; i < l; i++) {
                // TODO: verifying type of this.clients[i], if client is dead.
                this.clients[to[i]].send(message);
            }
        }
        // Else send to the specified client.
        else {
            this.clients[to].send(message);
        }
        return this;
    },

}
