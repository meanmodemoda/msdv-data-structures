//Learnings: let JavaScript to not be flexible
"use strict"

// dependencies
const fs = require('fs'),
      querystring = require('querystring'), //Learnings: querystring converts an object into querystring text format
      got = require('got'),
      async = require('async'),
      dotenv = require('dotenv');

//Learnings: make sure your API_KEY env variable name matches the variable name in .env file
dotenv.config();

const API_KEY = process.env.API_KEY;
const API_URL = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx'


//read and parse out stringified json file from weekly assignment 2 and save to a variable named `address`
//let addresses = JSON.parse(fs.readFileSync('/home/ec2-user/environment/data/aa-m01-address.json'));
let addresses = JSON.parse(fs.readFileSync('/home/ec2-user/environment/data/aa-m01-address.json'));
// console.log(addresses);

//a string formatting function that will be used later to update the address string to title case.
function toTitleCase(str) {
  return str.toLowerCase().split(' ').map(function (word) {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ');
};      

// geocode addresses
let meetingsData = [];

// eachSeries in the async module iterates over an array and operates on each item in the array in series
async.eachSeries(addresses, function(value, callback) {
    let query = {
        streetAddress: value,
        city: "New York",
        state: "NY",
        apikey: API_KEY,
        format: "json",
        version: "4.01"
    };

    // construct a querystring from the `query` object's values and append it to the api URL
    let apiRequest = API_URL + '?' + querystring.stringify(query);

console.log(query);

    (async () => {
    	try {
    		const response = await got(apiRequest);
    		let tamuGeo = JSON.parse(response.body);
    		console.log(tamuGeo['FeatureMatchingResultType'], apiRequest);
    		meetingsData.push(tamuGeo);
    		
    	} catch (error) {
    		console.log(error.response.body);
    	}
    })();

    // sleep for a couple seconds before making the next request
    setTimeout(callback, 2000);
}, function() {
    
    let addressUpdate = [];

    for (var i=0; i<meetingsData.length; i++) {
      addressUpdate[i] = {
            address: toTitleCase(meetingsData[i]["InputAddress"]["StreetAddress"].split(" New York NY")[0]).concat(", New York, NY"),
            latLong: {lat:meetingsData[i]["OutputGeocodes"][0]["OutputGeocode"]["Latitude"], lng:meetingsData[i]["OutputGeocodes"][0]["OutputGeocode"]["Longitude"]}
      };
}
    
    fs.writeFileSync('/home/ec2-user/environment/data/aa-m10-address-coordinates.json', JSON.stringify(addressUpdate));
    console.log('*** *** *** *** ***');
    console.log(`Number of meetings in this zone: ${meetingsData.length}`);
});