// Template to get this up and running came from:
// http://martinsikora.com/nodejs-and-websocket-simple-chat-tutorial

var WebSocketServer = require('websocket').server;
var http = require('http');
var clients = [];
var serverPort = 1337;
var maxItems = 33;

var server = http.createServer(function(request, response) {
  // Process HTTP request. Since we're writing just WebSockets server
  // we don't have to implement anything.
});

server.listen(serverPort, function() {
  console.log((new Date()) + " Server is listening on port " + serverPort);
});

wsServer = new WebSocketServer({
  httpServer: server
});

function sendCallback(err) {
  if (err) console.error("send() error: " + err);
}

var data = new Array;

// This callback function is called every time someone tries to connect to the
// WebSocket server
wsServer.on('request', function(request) {
  console.log((new Date()) + ' Connection from origin ' + request.origin + '.');

  var connection = request.accept(null, request.origin);
  console.log(' Connection ' + connection.remoteAddress);

  clients.push(connection);
  console.log(' Connection count ' + clients.length);

  connection.send(JSON.stringify(data), sendCallback);

  // This is the most important callback for us, we'll handle all messages from
  // users here.
  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      // process WebSocket message
      console.log((new Date()) + ' Received Message ' + message.utf8Data);

      data.push(JSON.parse(message.utf8Data));

      if (data.length > maxItems) {
        data.shift();
      }

      // Broadcast message to all connected clients
      clients.forEach(function (outputConnection) {
        outputConnection.send(JSON.stringify(data), sendCallback);
      });
    }
  });

  connection.on('close', function(connection) {
    clients.splice(clients.indexOf(connection), 1);
    console.log((new Date()) + " Peer disconnected.");
  });
});
