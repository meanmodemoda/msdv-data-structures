//insert content into table
const fs = require('fs');
const { Client } = require('pg');
var async = require('async');  
//why the `async` function is a `var`, does it mean `async` is designed to carry different values/functions?

const dotenv = require('dotenv').config({path:'../.env'})

let addresses = JSON.parse(fs.readFileSync('/home/ec2-user/environment/data/aa-m01-address-coordinates.json'));
let meetings = JSON.parse(fs.readFileSync('/home/ec2-user/environment/data/aa-m01-meeting-prettified.json'));

// console.log(addresses)
// console.log(meetings)

//AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'postgres';
db_credentials.host = 'data-structures.cmynmpcyvokh.us-east-1.rds.amazonaws.com';
db_credentials.database = 'AA';
db_credentials.password = process.env.PGSQL_KEY;

db_credentials.port = 5432;

// console.log(db_credentials.password)



async.eachSeries(meetings, function(value, callback) {
    const client = new Client(db_credentials);
    client.connect();
    // var thisQuery = "INSERT INTO aalocations VALUES (" +value.gid + ", E'" + value.address + "', " + value.latLong.lat + ", " + value.latLong.lng + ");";
    //Learnings: Use `E '' ` around the variable to escape commas
    var thisQuery = "INSERT INTO meetings VALUES (" + value.gid + ", E'" + value.mtgday + "', E'" + value.mtgstart + "', E'" + value.mtgend +"', E'"+ value.mtgtype +"');";
    
    client.query(thisQuery, (err, res) => {
        console.log(err, res);
        client.end();
    }); 
    setTimeout(callback, 1000); 
}); 

