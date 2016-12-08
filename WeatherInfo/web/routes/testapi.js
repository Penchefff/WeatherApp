var Arrow = require('arrow');

var ApiTestRoute = Arrow.Router.extend({
	name: 'testing weather api',
	path: '/weatherapi',
	method: 'GET',
	description: 'sending 5 day weather forecast',
	action: function (req, res, next) {
		req.server.getAPI('api/weatherapi', 'GET').execute({}, function(err, results) {
			if (err) {
				next(err);
			} else {
				res.send(JSON.stringify(results));
			}
		});
	}
});

module.exports = ApiTestRoute;