/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

var sys = require("sys");

exports.Client = function(connection, server) {

    this.conn = connection;
    this.server = server;

    //in many cases: "this" is a DOM object
    var me = this;
    this.conn.on("message", function(msg) {
        me.onMessage(msg);
    });

    this.conn.addListener("disconnect", function() {
        me.onDisconnect();
    });
}


exports.Client.prototype = {

    send: function(msg) {
        this.conn.send(msg);
    },

    onMessage: function(msg) {
        sys.log("Message received: " + msg);
        this.server.actionManager.manageMessage(this.conn, msg);
    },

    onDisconnect: function() {
    sys.log("Connection " + this.conn.sessionId + " has closed");
    }
}

