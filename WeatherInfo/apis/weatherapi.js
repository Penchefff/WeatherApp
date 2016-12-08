var Arrow		= require('arrow');
var requestP	= require('request-promise');

var TestAPI = Arrow.API.extend({
	group: 'weather',
	path: '/api/weatherapi',
	method: 'GET',
	description: 'this is an api that shows how to implement an API',
	model: 'forecast',
	before: 'pre_example',
	after: 'post_example',
	action: function (req, resp, next) {
		resp.stream(req.model.findAll, next);
	}
});

module.exports = TestAPI;
