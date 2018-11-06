var path = require('path');

var config = {
	host: 'localhost',
	port:'5432',
	user:'divya',
	password:'divya',
	database:'se1',
	max:'10',
	idleTimeoutMillis: 100 // how long a client is allowed to remain idle before being closed
}

module.exports = config
