/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

var sys = require("sys");

exports.Client = function(connection, server, gameEngine) {

    this.conn = connection;
    this.id = this.conn.sessionId;

    this.server = server;
    this.messageParser = gameEngine.messageParser;

    this.conn.on("message", function(msg) {
        this.onMessage(msg);
    }.bind(this));

    this.conn.addListener("disconnect", function() {
        this.onDisconnect();
    }.bind(this));

    gameEngine.onConnectionOpen(this);
};

exports.Client.prototype = {

    send: function(msg) {
        this.conn.send(msg);
    },

    onMessage: function(msg) {
        sys.log("Message received: " + msg);
        this.messageParser.parse(msg, this.id);
    },

    onDisconnect: function() {
        sys.log("Connection " + this.id + " has closed");
        // TODO
        // Tell the server this client is dead
    },
};

