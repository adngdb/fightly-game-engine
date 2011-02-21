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
 * @constructor
 */
ComManager = function(ge) {
    this.ge = ge;

    this.messageParser = null;

    this.host = 'localhost';
    this.port = 3401;

    this._socket = null;
};

ComManager.prototype = {

    init: function() {
        this.messageParser = new MessageParser(this.ge);

        this._socket = new io.Socket(this.host, { port: this.port });
        this._socket.on('connect', this._onOpen.bind(this));
        this._socket.on('message', this._onMessage.bind(this));
        this._socket.on('disconnect', this._onClose.bind(this));

        this._socket.connect();
    },

    _onOpen: function() {
        log("ComManager.onOpen");
    },

    _onMessage: function(msg) {
        log("ComManager.onMessage: "+msg);
        this.messageParser.parse(msg);
    },

    _onClose: function() {
        log("ComManager.onClose");
    },

    send: function(message) {
        this._socket.send(message);
    },

};
