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

var thisQuery = "CREATE TABLE meetings (gid int, mtgday varchar(25), mtgstart varchar(25), mtgend varchar(25), mtgtype varchar(75));";    
// var addressTable = "CREATE TABLE aalocations (gid integer, address varchar(100), lat double precision, long double precision);";
//I think I should change `day`, `start`, `end` to more thoughtful data types in the future

// var thisQuery = "CREATE TABLE test (address varchar(100), lat double precision, long double precision);";
// Sample SQL statement to delete a table: 
// var thisQuery = "DROP TABLE meetings;";  

client.query(thisQuery, (err, res) => {
    console.log(err, res);
    client.end();
});