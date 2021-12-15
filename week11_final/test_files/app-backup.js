//npm handlebars
//npm express
//npm moment --deprecated

var express = require('express'), 
app = express();
app.use(express.static('views/images')); 

const { Pool } = require('pg');
var AWS = require('aws-sdk');

const moment = require('moment-timezone');
const handlebars = require('handlebars');
var fs = require('fs');

const dotenv = require('dotenv').config({path:'../.env'})

const pbSource = fs.readFileSync("./templates/pb.txt").toString();
var pbtemplate = handlebars.compile(pbSource, { strict: true });

const aaSource = fs.readFileSync("./templates/aa.txt").toString();
var aatemplate = handlebars.compile(aaSource, { strict: true });

// AWS RDS credentials
var db_credentials = new Object();
db_credentials.user = 'postgres';
db_credentials.host = 'data-structures.cmynmpcyvokh.us-east-1.rds.amazonaws.com';
db_credentials.database = 'AA';
db_credentials.password = process.env.PGSQL_KEY;
db_credentials.port = 5432;


app.get('/', function(req, res) {
    res.send('<h3>Code demo site</h3><ul><li><a href="/aa">aa meetings</a></li><li><a href="/processblog">process blog</a></li></ul>');
}); 

// respond to requests for /aa
app.get('/aa', function(req, res) {
    
    var now = moment.tz(Date.now(), "America/New_York"); 
    var dayy = now.day().toString(); 
    var hourr = now.hour().toString(); 
    
    console.log(dayy)

    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);
    
    // SQL query 
                 
var thisQuery = `SELECT lat, long, json_agg(json_build_object('groupname',groupname,'gid',gid,'zonename',zonename, 'neighborhood', neighborhood, 'day',day, 'starttime', starttime, 'sampm',sampm, 'endtime', endtime, 'eampm', eampm,'type', type, 'interest',interest,'address',address, 'crossstreet',crossstreet, 'wheelchair', wheelchair)) as meetings
                 FROM aafinal
                 GROUP BY lat, long;`;
            

    client.query(thisQuery, (qerr, qres) => {
        if (qerr) { throw qerr }
        
        else {
             res.end(aatemplate({aadata: JSON.stringify(qres.rows)}));
            client.end();
            console.log('2) responded to request for aa meeting data');
        }
    });
});

app.get('/processblog', function(req, res) {
    // AWS DynamoDB credentials
    AWS.config = new AWS.Config();
    AWS.config.region = "us-east-1";
    console.log(req.query.type);
    
    var industry = "apparel";
    
    if (['apparel', 'luxury' ,'resale','rental','footwear','streetwear','fast fashion','beauty'].includes(req.query.type)) {
        industry = req.query.type;
    }

    // Connect to the AWS DynamoDB database
    var dynamodb = new AWS.DynamoDB();

    // DynamoDB (NoSQL) query
    var params = {
        TableName : "dealblog",
        KeyConditionExpression: "industry = :industryName", // the query expression
        ExpressionAttributeValues: { // the query values
             ":industryName": {S:industry}
        }
    };

    dynamodb.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            throw (err);
        }
        else {
            console.log(data.Items)
            res.end(pbtemplate({ pbdata: JSON.stringify(data.Items)}));
            console.log('3) responded to request for process blog data');
        }
    });
});

// serve static files in /public
app.use(express.static('public'));

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

// listen on port 8080
var port = process.env.PORT || 8080;

app.listen(port, function() {
    console.log('Server listening...');
});