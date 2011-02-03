/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

/**
 * Class ComManager
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 */
ComManager = function(ge) {
    this.ge = ge;

    this._ws = null;
    this._socket = null;
    this.serverLocation = 'ws://localhost:3401';
    this.host = 'localhost';
    this.port = 3401;
};

ComManager.prototype = {

    init: function() {
        this._socket = new io.Socket(this.host, { port: this.port });
        this._socket.connect();
        this._socket.on('connect', this._onOpen);
        this._socket.on('message', this._onMessage);
        this._socket.on('disconnect', this._onClose);
    },

    _onOpen: function() {
        alert("On open");
    },

    _onMessage: function(msg) {
        // received msg.data
    },

    _onClose: function() {
        // close game
        alert("On close");
        this._ws = null;
    },

    send: function(message) {
        this._socket.send(message);
    },

};
