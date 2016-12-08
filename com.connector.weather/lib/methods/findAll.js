var requestP	= require('request-promise');
var Arrow = require('arrow'),
	Collection = Arrow.Collection,
	ORMError = Arrow.ORMError;
exports.findAll = function findAll(Model, callback) {
	
	console.log(this.config.OPEN_WEATHER_APP_ID);
	
	var WEATHER_URL	= 'http://api.openweathermap.org/data/2.5/forecast?q=Sofia,bg&mode=json&appid=' + this.config.OPEN_WEATHER_APP_ID;
	
	var request_weather	= requestP.defaults(
	{
		method		: 'GET',
		url			: WEATHER_URL,
		json		: true,
		headers		: {
			'User-Agent': 'Request-Promise',
		},
	});
	
	function get_forecast()
	{
		return new Promise(function(resolve, reject)
		{
			request_weather().then(function(response)
			{
				if(response.error){ reject(response.error); }
				else{ resolve(response); }
			});
		});
	}
	
	function get_min_max(weather)
	{
		weather.min_temp = weather.list.map((i) => i.main.temp_min).sort()[0];
		weather.max_temp = weather.list.map((i) => i.main.temp_max).sort(function(a, b){ return b-a })[0]
		
		return new Promise((resolve, reject) =>
		{
			resolve(weather)
		});
	}
	
	var weather = get_forecast();
	
	weather
		.then(get_min_max)
		.then(function(weather)	{ callback(null, weather); })
		.catch(function(err)	{ console.log(err); callback(new ORMError('ooops something went wrong')); })
	;
};