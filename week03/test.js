"use strict"

// import Addressclass from "./week03/address.js";

// dependencies
const fs = require('fs'),
      querystring = require('querystring'), //Learnings: querystring convert an object into querystring text format
      got = require('got'),
      async = require('async'),
      dotenv = require('dotenv');
      

function toTitleCase(str) {
  return str.toLowerCase().split(' ').map(function (word) {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ');
};      
      
let addressOutput = JSON.parse(fs.readFileSync('/home/ec2-user/environment/data/aa-o1-address-coordinates.json'));


//the following 3 lines of code are used for debugging and testing
// let input=toTitleCase(addressOutput[1]["InputAddress"]["StreetAddress"].split(" New York NY")[0]).concat(", New York, NY");
// let latOutput=String(addressOutput[1]["OutputGeocodes"][0]["OutputGeocode"]["Latitude"]);
// let lngOutput=String(addressOutput[1]["OutputGeocodes"][0]["OutputGeocode"]["Longitude"]);

let addressUpdate = [];

for (var i=0; i<addressOutput.length; i++) {
      addressUpdate[i] = {
            address: toTitleCase(addressOutput[i]["InputAddress"]["StreetAddress"].split(" New York NY")[0]).concat(", New York, NY"),
            latLong: {lat:addressOutput[i]["OutputGeocodes"][0]["OutputGeocode"]["Latitude"], lng:addressOutput[i]["OutputGeocodes"][0]["OutputGeocode"]["Longitude"]}
      };
}


 console.log(addressUpdate);

// fs.writeFileSync('/home/ec2-user/environment/data/test.json', JSON.stringify(lng));