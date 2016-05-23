
  var express = require('express');
  var app = express();
  var http = require('http').Server(app);
  var bodyParser = require('body-parser');
  var io = require('socket.io')(http);
  var dweetClient = require('node-dweetio');
  var dweetio = new dweetClient();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(express.static('public'));

  app.get('/', function (req, res) {
  	res.sendFile(__dirname + 'index.html');
  });

  app.use(function (req, res) {
  	 res.status(404).json({
      mensagem: 'Recurso não existente'
    });
  });

  io.on('connection', function(socket){
    
    console.log('A connection has benn established');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });

  });

  dweetio.listen_for('web-client-iot-cs', function (dweet) {
    console.log(dweet.content);
    io.emit('sensor-data', dweet.content);
  });


  http.listen(process.env.PORT || 3000, function () {
  	console.log('Servidor no ar');
  });


