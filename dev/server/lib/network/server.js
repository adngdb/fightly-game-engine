var sys = require("sys"),
    ws  = require("websocket-server"),
    client = require('./client');

function log(data){
    sys.log("\033[0;32m"+data+"\033[0m");
}

var server = ws.createServer();
server.listen(3400);

server.addListener("connection", function(connectionData)
{
    log("New connection: " + connectionData.id);
    
    new client.Client(connectionData, server);
   
});

log("Server created. Listening on port 3400. ");

