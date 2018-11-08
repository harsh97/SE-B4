var path = require('path');

var config = {
		host: 'localhost',
		user: 'divya',
		password: 'divya',
		port: 5432,
		database: 'se1',
		max: '10',
		idleTimeoutMillis: 100 // how long a client is allowed to remain idle before being closed
}

module.exports = config;