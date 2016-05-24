/* ****************************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 *****************************************************************************/

var util = require('util');
var http = require('http').Server();
var io = require('socket.io')(http);

var client = require('./client');

/**
 * Create and handle the connections with clients.
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 * @constructor
 */
function ComManager(eventsListener) {
    this.listener = eventsListener;

    this.clients = [];

    io.on('connection', function(socket) {
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
        http.listen(port, () => {
            util.log('Server created. Listening on port ' + port);
        });
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

}

exports.ComManager = ComManager;
