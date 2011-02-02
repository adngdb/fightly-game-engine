var sys = require("sys"),
    http = require('http'),
    io = require('socket.io'),

    client = require("./client"),
    actionManager = require("./action-manager");

exports.Server = function() {
    this.server = http.createServer(function(req, res){});
    //this.actionManager = new actionManager.ActionManager(this.server);

    this.socket = io.listen(this.server);
	
    var me = this;
    this.socket.on('connection', function(conn){
	me.onConnect(conn);
    });
}

exports.Server.prototype = {
    listen : function(port){
	this.server.listen(port);
	sys.log("Server created. Listening on port " + port + ".");
    },
    
    onConnect : function(connection) {
	sys.log("New connection: " + connection.sessionId);   
    	new client.Client(connection);
    }
}

/*
// Require HTTP module (to start server) and Socket.IO
http = require('http'), io = require('socket.io');

// Start the server at port 8080
var server = http.createServer(function(req, res){ 

  // Send HTML headers and message
  res.writeHead(200,{ 'Content-Type': 'text/html' }); 
  res.end('<h1>Hello Socket Lover!</h1>');
});
server.listen(8080);

// Create a Socket.IO instance, passing it our server
var socket = io.listen(server);

// Add a connect listener
socket.on('connection', function(client){ 
	
  client.send('This is a message from the server!');  

  // Success!  Now listen to messages to be received
  client.on('message',function(event){ 
    console.log('Received message from client: ' + event);
    client.send("hello " + client.sessionId);
  });
  client.on('disconnect',function(){    
    console.log('Server has disconnected');
  });

});
*/
