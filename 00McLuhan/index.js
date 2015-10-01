/*Para hacer el chat ->Instalar el Node js
-poner en el CDM la dirección del proyecto 
-poner la línea:npm install --save express
-poner la línea:npm install --save socket.io
-Abir localhost apache para leer los assets
y por último ejecutar en CMD: node index.js
--para terminar la conexión Ctrl + C --*/

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

/*app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});*/

//So far in index.js we’re calling res.send and pass it a HTML string. Our code would look very confusing if we just placed our entire application’s HTML there. Instead, we’re going to create a index.html file and serve it.

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.emit('some event', { for: 'everyone' });

io.on('connection', function(socket){
  socket.broadcast.emit('hi');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

