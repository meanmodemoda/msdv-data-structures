//npm install console.table 
const fs = require('fs');
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

// var thisQuery = "SELECT COUNT(DISTINCT inputAddress) FROM groupAddresses a JOIN addressCoordinates c ON a.address=c.inputAddress";
// var thisQuery = "SELECT COUNT (*) FROM groupAddresses;"
// var thisQuery = "SELECT COUNT (*) FROM addressCoordinates;"
// var thisQuery = "SELECT a.groupName, m.gid, m.zoneName, m.startTime, m.sAmPm, m.endTime, m.eAmPm, m.type, m.interest, c.address, a.crossStreet, c.long, c.lat, a.wheelChair FROM groupMeetings m JOIN groupAddresses a ON m.gid = a.gid and m.zoneName=a.zoneName JOIN addressCoordinates c ON a.address=c.inputAddress WHERE m.day = 'Monday' LIMIT 50;";
// create dummy data
// var thisQuery = "SELECT COUNT(*) FROM groupMeetings m JOIN groupAddresses a ON m.gid = a.gid AND m.zoneName=a.zoneName JOIN addressCoordinates c ON a.address=c.inputAddress";

// var thisQuery = "SELECT DISTINCT a.groupName, m.gid, m.zoneName, n.neighborhood, m.day, m.startTime, m.sAmPm, m.endTime, m.eAmPm, m.type, m.interest, c.address, a.crossStreet, c.long, c.lat, a.wheelChair FROM groupMeetings m LEFT JOIN groupAddresses a ON m.gid = a.gid AND m.zoneName=a.zoneName LEFT JOIN addressCoordinates c ON a.address=c.inputAddress LEFT JOIN neighborhoods n ON n.zonename=m.zoneName;";

// var thisQuery = "SELECT DISTINCT interest FROM groupMeetings;";

var thisQuery = `SELECT lat, long, json_agg(json_build_object('groupname',groupname,'gid',gid,'zonename',zonename, 'neighborhood', neighborhood, 'day',day, 'starttime', starttime, 'sampm',sampm, 'endtime', endtime, 'eampm', eampm,'type', type, 'interest',interest,'address',address, 'crossstreet',crossstreet, 'wheelchair', wheelchair)) as meetings
                 FROM aafinal
                 GROUP BY lat, long;`;

client.query(thisQuery, (err, res) => {
    if (err) {throw err}
    else {
        console.table(res.rows);
          fs.writeFileSync('/home/ec2-user/environment/data/aa-test.json',  JSON.stringify(res), function(err) {
    if (err) throw err;
    console.log('complete');
          });
    }
        client.end();
});





