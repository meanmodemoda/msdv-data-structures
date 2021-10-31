//insert content into table
const fs = require('fs');
const { Client } = require('pg');
var async = require('async');  
//why the `async` function is a `var`, does it mean `async` is designed to carry different values/functions?

const dotenv = require('dotenv').config({path:'../.env'})

// let addressCoordinates = JSON.parse(fs.readFileSync('/home/ec2-user/environment/data/aa_cleaned/addressCoordinates.json'));
let groupMeetings = JSON.parse(fs.readFileSync('/home/ec2-user/environment/data/aa_cleaned/groupMeetings.json'));
// let groupAddresses = JSON.parse(fs.readFileSync('/home/ec2-user/environment/data/aa_cleaned/groupAddresses.json'));

// console.log(addressCoordinates)
console.log(groupMeetings)
// console.log(groupAddresses)

//AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'postgres';
db_credentials.host = 'data-structures.cmynmpcyvokh.us-east-1.rds.amazonaws.com';
db_credentials.database = 'AA';
db_credentials.password = process.env.PGSQL_KEY;

db_credentials.port = 5432;

// // // // // console.log(db_credentials.password)



async.eachSeries(groupMeetings, function(value, callback) {
    const client = new Client(db_credentials);
    client.connect();
     var thisQuery = `INSERT INTO groupMeetings VALUES (${value.mid},E'${value.zoneName.S}', ${value.gid.N}, E'${value.day.S}',E'${value.start.S}', E'${value.sAmPm.S}', E'${value.end.S}', E'${value.eAmPm.S}',E'${value.typeCode.S}',E'${value.type.S}', E'${value.interest.S}');`;
    // var thisQuery = `INSERT INTO groupAddresses VALUES (E'${value.zoneName.S}', ${value.gid.N}, E'${value.address.S}', E'${value.groupName.S}', E'${value.crossStreet.S}',E'${value.notes.S}', E'${value.wheelChair.BOOL}');`;
    //Learnings: Use `E '' ` around the variable to escape commas
    // var thisQuery = `INSERT INTO meetings VALUES (${value.gid}, E'${value.mtgday}', E'${value.mtgstart}', E'${value.mtgend}', E'${value.mtgtype}');`;
    
    client.query(thisQuery, (err, res) => {
        console.log(err, res);
        client.end();
    }); 
    setTimeout(callback, 1000); 
}); 

