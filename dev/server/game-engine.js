var sys = require("sys"),
    ws  = require('./vendor/node-websocket-server/lib/ws/server');

function log(data){
  sys.log("\033[0;32m"+data+"\033[0m");
}

var server = ws.createServer();
server.listen(3400);

server.addListener("connection", function(client)
{
    log("New connection: " + client.id);
    server.send(client.id, "Welcome");

    client.addListener("message", function(msg)
    {
        log("Message received: " + msg);
        server.broadcast(msg);
    });

    client.addListener("close", function()
    {
        log("Connection closed by client");
    });
});

log("Server created. Listening on port 3400. ");
