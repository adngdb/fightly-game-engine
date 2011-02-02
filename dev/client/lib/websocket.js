
window.onload = function() {
    if (!window.WebSocket)
        alert('Votre navigateur ne supporte pas les web sockets');
    else
    {
        client.load();
	document.getElementById("idLogIn").onclick = logIn;
	document.getElementById("idLogOut").onclick = logOut;	
	document.getElementById("idPlay").onclick = doSomething;	
    }
}

var socket;
client = {
    
    load: function() {
	
        // Create SocketIO instance, connect
	socket = new io.Socket('localhost',{
	  port: 8080
	});
	socket.connect();
        // Add a connect listener
	socket.on('connect',function() {
	  alert('Client has connected to the server!');
	});
	// Add a connect listener
	socket.on('message',function(data) {
	  alert('Received a message from the server: ' + data);
	});
	// Add a disconnect listener
	socket.on('disconnect',function() {
	  alert('The client has disconnected!');
	});

    }
   
/*
    // Sends a message to the server via sockets
    function sendMessageToServer(message) {
	  socket.send(message);
    }    
*/  
}


function logIn(){
	//get a JSONText just for example
        var JSONObject = { 'action' : 'login', 
			   'params' : {'name' : 'aduc', 'pass' : ''}
			 };
	
	var JSONText = JSON.stringify(JSONObject);
	sendMessage(JSONText);
}

function logOut(){
	//get a JSONText just for example
        var JSONObject = { 'action' : 'logout', 
			   'params' : {'name' : 'aduc', 'pass' : ''}
			 };
	
	var JSONText = JSON.stringify(JSONObject);
	sendMessage(JSONText);
}

function doSomething(){
	//get a JSONText just for example
        var JSONObject = { 'action' : 'move', 
			   'params' : {'direction' : 'left', 'distance' : '2'}
			 };
	
	var JSONText = JSON.stringify(JSONObject);
	sendMessage(JSONText);

}
function sendMessage(JSONText) {
	
	socket.send(JSONText);
}   

