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
 * Class Client
 *
 * @constructor
 */
var Client = function(id, socket, emitter) {
    var self = this;

    this.id = id;
    this.socket = socket;
    this.emitter = emitter;

    this.socket.on('disconnect', function() {self.disconnect.apply(self, arguments); });
    this.socket.on('action', function() {self.receiveAction.apply(self, arguments); });
};

/**
 * Send message to Client
 * @param msg: JSON Message in String format
 */
Client.prototype.send = function(msg) {
    this.socket.send(msg);
};

/**
 * Listen for message received
 * @param msg: message receiced
 */
Client.prototype.receiveAction = function(data) {
    //~ util.log("Action received: " + data);
    this.emitter.emit('actionReceive', data);
};

/**
 * Listen for event "disconnect"
 *
 */
Client.prototype.disconnect = function() {
    //~ util.log("Connection " + this.id + " has closed");
    this.emitter.emit('clientDisconnect', this);
};

exports.Client = Client;
