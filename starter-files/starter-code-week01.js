// npm install got
// mkdir data
// npm install cheerio

const fs = require('fs');
const got = require('got');

(async () => {
	try {
		const response = await got('https://parsons.nyc/thesis-2020/');
		console.log(response.body);
		fs.writeFileSync('/home/ec2-user/environment/data/thesis.txt', response.body);
		//=> '<!doctype html> ...'
	} catch (error) {
		console.log(error.response.body);
		//=> 'Internal server error ...'
	}
})();



