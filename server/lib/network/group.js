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
 * Class Group
 *
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
