var Arrow = require('arrow');

var Forecast = Arrow.Model.extend('forecast',{
	fields: {
		first_name: {type:String},
		last_name: {type:String},
		email: {type:String}
	},
	connector: 'appc.arrowdb'
});

module.exports = Forecast;