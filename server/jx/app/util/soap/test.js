var soap = require('soap');
var url = 'http://api.metabus.ru/0.0.1/ws/SearchingModule?WSDL';
var args = {
	geoFilter : {
		distance : 10
	},
	text : 'test'
}
soap.createClient(url, function(err, client) {
			client.search(args, function(err, result) {
						console.log(result.body);
					})
		})