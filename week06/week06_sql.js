//npm install console.table 

const { Client } = require('pg');
const cTable = require('console.table');
const dotenv = require('dotenv').config({path:'../.env'});
//Learnings `coonsole.table` outputs data in tabular format 

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'postgres';
db_credentials.host = 'data-structures.cmynmpcyvokh.us-east-1.rds.amazonaws.com';
db_credentials.database = 'AA';
db_credentials.password = process.env.PGSQL_KEY;

db_credentials.port = 5432;

// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

// var thisQuery = "SELECT COUNT (*) FROM aalocations;"
// var thisQuery = "SELECT COUNT (*) FROM meetings;"
var thisQuery = "SELECT m.gid, m.mtgday, m.mtgstart, m.mtgend, m.mtgtype, l.address FROM aalocations l LEFT JOIN meetings m ON l.gid = m.gid WHERE m.mtgday = 'Monday' and m.mtgtype = 'OD';";

client.query(thisQuery, (err, res) => {
    if (err) {throw err}
    else {
        console.table(res.rows);
        client.end();
    }
});

