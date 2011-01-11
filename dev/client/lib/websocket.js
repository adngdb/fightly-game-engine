
window.onload = function() {
    if (!window.WebSocket)
        alert('Votre navigateur ne supporte pas les web sockets');
    else
    {
        socket.load();
    }
}

socket = {
    _ws: null,
    load: function() {
        var location = 'ws://localhost:3400'
        this._ws = new WebSocket(location);
        this._ws.onopen = this._onopen;
        this._ws.onmessage = this._onmessage;
        this._ws.onclose = this._onclose;
    },

    _onopen: function() {
        alert('Socket ouvert !');
        this.send("Hello dude");
    },
    _onclose: function() {
        alert('Socket fermé !');
        this._ws = null;
    },
    _onmessage: function(m) {
        alert('Je viens de recevoir un message : ' + m.data);
    }
}
