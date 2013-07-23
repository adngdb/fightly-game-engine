/* ****************************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 *****************************************************************************/

var util = require('util');
var http = require('http');
var io = require('socket.io');

var client = require('./client');

/**
 * Create and handle the connections with clients.
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 * @constructor
 */
function ComManager(eventsListener) {
    this.listener = eventsListener;

    this.server = http.createServer(function(req, res){});
    this.sockets = io.listen(this.server).sockets;

    this.clients = [];

    this.sockets.on('connection', function(socket) {
        this.onConnect(socket);
    }.bind(this));
}

ComManager.prototype = {

    /**
     * Server listens on a port
     * @param port Port Number
     * @return this
     */
    listen : function(port) {
        this.server.listen(port);
        util.log('Server created. Listening on port ' + port);
        return this;
    },

    /**
     * Create a connection which is correspondant with a Client
     * @param socket Socket Connection of a Client
     * @return this
     */
    onConnect : function(socket) {
        util.log('New connection: ' + socket.id);
        this.clients[socket.id] = new client.Client(socket.id, socket, this.listener);
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

exports.ComManager = ComManager;
