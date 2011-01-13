
function Client(connectionData, server) {
    this.conn = connectionData;
    this.server = server;

    conn.addListener("message", function(msg)
    {
        this.onMessage(msg);
    });

    client.addListener("close", function()
    {
        this.onClose();
    });
}

Client.prototype = {
    send: function(message) {
        server.send(conn.id, message);
    },
    onMessage: function(msg) {
    },
}
