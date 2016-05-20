
  var express = require('express');
  var app = express();
  var bodyParser = require('body-parser');

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

  app.listen(process.env.PORT || 3000, function () {
  	console.log('Servidor no ar');
  });


