var Arrow		= require('arrow');
var requestP	= require('request-promise');

var WeatherRoute = Arrow.Router.extend({
	name: 'forecast',
	path: '/forecast',
	method: 'GET',
	description: 'this is 5 day forecast hardcoded',
	action: function (req, resp, next) {
		
		var WEATHER_URL	= 'http://api.openweathermap.org/data/2.5/forecast?q=Isperikh,bg&mode=json&appid=37a3c858ce59878c5900a0d97f34bc3d';
		
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
			.then(function(weather)	{ next(resp.render('forecast', weather)); })
			.catch(function(err)	{ next(resp.render('forecast', err)); })
		;
	}
});

module.exports = WeatherRoute;
