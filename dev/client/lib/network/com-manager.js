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
    this.serverLocation = 'ws://localhost:3401';
};

ComManager.prototype = {

    init: function() {

        if (!window.WebSocket) {
            alert('Your browser doesn\'t support WebSocket.');
            return;
        }
        this._ws = new WebSocket(this.serverLocation);
        this._ws.onopen = this._onOpen;
        this._ws.onmessage = this._onMessage;
        this._ws.onclose = this._onClose;
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
        this._ws.send(message);
    },

};
