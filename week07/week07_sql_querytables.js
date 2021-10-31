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
var thisQuery = "SELECT a.groupName, m.gid, m.zoneName, m.startTime, m.sAmPm, m.endTime, m.eAmPm, m.type, m.interest, c.address, a.crossStreet, c.long, c.lat FROM groupMeetings m LEFT JOIN groupAddresses a ON m.gid = a.gid and m.zoneName=a.zoneName LEFT JOIN addressCoordinates c on a.address=c.inputAddress WHERE m.day = 'Monday' LIMIT 50;";

client.query(thisQuery, (err, res) => {
    if (err) {throw err}
    else {
        console.table(res.rows);
        client.end();
    }
});

