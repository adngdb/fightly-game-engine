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
 * Represent and handle a group of connected client, used to send a message
 * to a list of clients in an easy way.
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 * @constructor
 */
function Group(id) {
    this.id = id;
    this.clients = [];
}

Group.prototype = {

    addClient: function(client) {
        this.clients.push(client);
    },

    removeClient: function(client) {
        this.clients.splice(this.clients.indexOf(client), 1);
    },

    send: function(msg) {
        for (c in this.clients) {
            this.clients[c].send(msg);
        }
    },

}

exports.Group = Group;
