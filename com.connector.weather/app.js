/**
 * NOTE: This file is simply for testing this connector and will not
 * be used or packaged with the actual connector when published.
 */
var Arrow = require('arrow'),
	server = new Arrow();

// TODO: Define a model that you can use when you run the connector locally for testing.
server.addModel(Arrow.Model.extend('weatherforecast', {
	fields: {
		// TODO: Add fields to it.
		name: {type: String},
		title: {type: String}
	},
	connector: 'com.connector.weather'
}));

server.start();
