'use strict';
var LiveMysql = require('mysql-live-select');
var express   = require('express');
var app       = express();
var server    = require('http').createServer(app);
var io        = require('socket.io')(server);
var port      = process.env.PORT || 3000;

// Keep an list of clients connected
var connected = [];

// Socket logic

io.on('connection', function(socket){ // when a client connects
  console.log('Client connected !');

  connected.push(socket);                   // add the new client to list of connected clients
  socket.emit('players', results.data);     // send initial data to the new client
  
  socket.on('disconnect', function(client){ // when client disconnects
    console.log('Client disconnected !');
    var index = connected.indexOf(client);
    connected.splice(index, 1);             // remove client from the list of connected clients
  });

});


// mysql-live-select logic

var settings = {                            // settings for connection
  host: 'localhost', user: 'root', password: ' ', database: 'pubsubdb', serverId: 16, minInterval: 200
};

var liveConnection = new LiveMysql(settings);
var table          = 'players';

var results = liveConnection.select(function(esc, escId){   // save initial data in results
  return (
    'select * from ' + escId(table)                         // query for fetching the data
  );
}, [{
  table: table                                              
}]).on('update', function(diff, data){                      // triggered on data change in mysql
  connected.forEach(function(client){     
    client.emit('players', data);                           // send new data to all the connected clients
  })
});


// express logic
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');            // serve index.html 
});
app.use('/', express.static(__dirname + '/public'));  // serve js and css static files in public 

server.listen(port, function(){
  console.log("Server started");
});                                  // start the server