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

    this.mp = null;

    this.host = 'localhost';
    this.port = 3401;

    this._socket = null;
};

ComManager.prototype = {

    init: function() {
        this.mp = new MessageParser(this.ge);

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
        this.mp.parse(msg);
    },

    _onClose: function() {
        alert("On close");
    },

    send: function(message) {
        this._socket.send(message);
    },

};
