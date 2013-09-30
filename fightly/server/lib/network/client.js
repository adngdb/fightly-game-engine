/* ****************************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 *****************************************************************************/

var util = require('util');

/**
 * Represent and handle a connected client, used to send or receive messages
 * to or from that client.
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 * @constructor
 */
function Client(id, socket, emitter) {
    var self = this;

    this.id = id;
    this.socket = socket;
    this.emitter = emitter;

    this.socket.on('disconnect', function() {
        self.disconnect.apply(self, arguments);
    });
    this.socket.on('action', function() {
        self.receiveAction.apply(self, arguments);
    });
    this.socket.on('data', function() {
        self.receiveData.apply(self, arguments);
    });

    this.emitter.emit('newPlayer', this);
};

/**
 * Send message to Client
 * @param msg: JavaScript object (will be changed to JSON)
 */
Client.prototype.send = function(msg) {
    //util.log('Sending ' + util.inspect(msg));
    msg = JSON.stringify(msg);
    this.socket.send(msg);
};

/**
 * Listen for message received
 * @param msg: message receiced
 */
Client.prototype.receiveAction = function(action) {
    //util.log('Received action ' + util.inspect(action));
    var message = {
        "action": action,
        "client": this
    };
    this.emitter.emit('actionReceive', message);
};

/**
 * Listen for message received
 * @param msg: message receiced
 */
Client.prototype.receiveData = function(data) {
    var message = {
        "data": data,
        "client": this
    };
    this.emitter.emit('dataReceive', message);
};

/**
 * Listen for event "disconnect"
 *
 */
Client.prototype.disconnect = function() {
    this.emitter.emit('clientDisconnect', this);
};

Client.prototype.toJSON = function () {
    // There is no need to send anything about the Client object to clients.
    return null;
}

exports.Client = Client;
