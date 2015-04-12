var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));
app.use(require('body-parser').json());

app.post('/hook/:channel', function(req, res) {
  console.log('emit', req.params.channel, req.body);
  io.emit(req.params.channel, req.body);
  res.send();
});

io.on('connection', function(socket) {
  console.log('socket connected');
  socket.on('disconnect', function() {
    console.log('socket disconnected');
  });
});

server.listen(process.env.PORT || 3000, function() {
  console.log('server started');
});
