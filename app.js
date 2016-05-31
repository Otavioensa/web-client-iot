
  var express = require('express');
  var app = express();
  var http = require('http').Server(app);
  var bodyParser = require('body-parser');
  var io = require('socket.io')(http);
  var dweetClient = require('node-dweetio');
  var dweetio = new dweetClient();
  var moment = require('moment');

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(express.static('public'));

  app.get('/', function (req, res) {
    res.sendFile(__dirname + 'index.html');
  });

  app.use(function (req, res) {
    res.status(404).json({
      mensagem: 'Resource not found'
    });
  });

  io.on('connection', function(socket){ 
    console.log('A connection has benn established');
    socket.on('disconnect', function(){
      console.log('User disconnected');
    });
  });

  dweetio.listen_for('web-client-iot-cs', function (dweet) {  
    var data = {
      sensorData: dweet.content,
      time: moment().format('HH:mm:ss')
    };
    io.emit('sensor-data', data);
  });


  http.listen(process.env.PORT || 3000, function () {
    console.log('Server on');
  });


