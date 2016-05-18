
	var dweetClient = require('node-dweetio');
	var dweetio = new dweetClient();

	dweetio.listen_for('cs-iot-thing-tutorial', function (dweet) {
		console.log(dweet.content);
	});