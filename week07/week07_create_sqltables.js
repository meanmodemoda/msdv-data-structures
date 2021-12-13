//npm install pg
//npm install `env`, `async` because of the new environment
//Create a table

const { Client } = require('pg');
const dotenv = require('dotenv').config({path:'../.env'})

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'postgres';
db_credentials.host = 'data-structures.cmynmpcyvokh.us-east-1.rds.amazonaws.com';
db_credentials.database = 'AA';
db_credentials.password = process.env.PGSQL_KEY;
db_credentials.port = 5432;

// console.log(db_credentials.password)

const client = new Client(db_credentials);
client.connect();

// Sample SQL statement to create a table: 
// var thisQuery = "CREATE TABLE neighborhoods (zonename varchar(100), neighborhood varchar(100));"
var thisQuery = "CREATE TABLE aafinal (groupname varchar(150), gid int, zonename varchar(25), neighborhood varchar(75), day varchar(25), starttime varchar(25), sampm varchar(25), endtime varchar(25), eampm varchar(25), type varchar(75), interest varchar(150), address varchar(250), crossstreet varchar(250), long double precision, lat double precision, wheelChair boolean);";  
// var thisQuery = "CREATE TABLE groupMeetings (mid int, zoneName varchar(25), gid int, day varchar(25), startTime varchar(25), sAmPm varchar(25), endTime varchar(25), eAmPm varchar(25), typeCode varchar(10), type varchar(75), interest varchar(75));";    
// var thisQuery = "CREATE TABLE groupAddresses (zoneName varchar(25), gid int, address varchar(75), groupName varchar(150), crossStreet varchar(250), notes varchar(250), wheelChair boolean);";    
// var thisQuery = "CREATE TABLE addressCoordinates (inputAddress varchar(75), address varchar(75), lat double precision, long double precision);";
//I think I should change `day`, `start`, `end` to more thoughtful data types in the future

// Sample SQL statement to delete a table: 
// var thisQuery = "DROP TABLE addressCoordinates";  
// var thisQuery = "DROP TABLE groupAddresses";  
// var thisQuery = "DROP TABLE neighborhoods";  
// var thisQuery = "DROP TABLE aafinal";  
client.query(thisQuery, (err, res) => {
    console.log(err, res);
    client.end();
});