//npm handlebars
//npm express

var express = require('express'), 
app = express();
const { Pool } = require('pg');
var AWS = require('aws-sdk');

const handlebars = require('handlebars');
var fs = require('fs');
const dotenv = require('dotenv').config({path:'../.env'})

const pbSource = fs.readFileSync("./templates/pb.txt").toString();
var pbtemplate = handlebars.compile(pbSource, { strict: true });

// AWS RDS credentials
var db_credentials = new Object();
db_credentials.user = 'postgres';
db_credentials.host = 'data-structures.cmynmpcyvokh.us-east-1.rds.amazonaws.com';
db_credentials.database = 'AA';
db_credentials.password = process.env.PGSQL_KEY;

db_credentials.port = 5432;

// create templates
var hx = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>AA Meeting</title>
<meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no">
<link href="https://api.mapbox.com/mapbox-gl-js/v2.6.0/mapbox-gl.css" rel="stylesheet">
<script src="https://api.mapbox.com/mapbox-gl-js/v2.6.0/mapbox-gl.js"></script>
<script src="https://d3js.org/d3.v6.js"></script>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
   integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
   crossorigin=""/>
 <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
   integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
   crossorigin=""></script>
   <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<link href="./style.css" rel="stylesheet">
</head>
<body>
<nav>
    <div class="navbar">
  <div class="neighborhood">       
 <select id="neighborhood">
    <option value='neighborhood' selected>Neighborhood</option>
    <option value='Tribeca' >Tribeca</option>
    <option value='Meatpacking' >Meatpacking</option>
    <option value='Flatiron' >Flatiron</option>
    <option value='Midtown West' >Midtown West</option>
    <option value='Murray Hill' >Murray Hill</option>
    <option value='Upper West Side' >Upper West Side</option>
    <option value='Lenox Hill' >Lenox Hill</option>
    <option value='Manhattanville' >Manhattanville</option>
    <option value='East Harlem' >East Harlem</option>
    <option value='Washington Heights' >Washington Heights</option>
  </select>
  </div>
   <div class="day">  
       <select id="day">
   <option value='Anyday' selected>Any Day</option>
    <option value='Monday'>Monday</option>
    <option value='Tuesday'>Tuesday</option>
    <option value='Wednesday'>Wednesday</option>
    <option value='Thursday'>Thursday</option>
    <option value='Saturday'>Saturday</option>
   <option value='Sunday'>Sunday</option>
  </select>
 </div>

  
 <div class="time">
<input id="time" type="time" name="time" value = "10:00" step=900>
 </div>
 
    <div class="type">  
  <select id="type">
      <option value="Beginners">Beginners</option>
      <option value="Big Book">Big Book</option>
<option value="Closed Discussion" selected>Closed Discussion</option>
<option value="Open">Open</option>
<option value="Open Discussion">Open Discussion</option>
<option value="Step">Step</option>
<option value="Spanish speaking group">Spanish speaking group</option>
<option value="Tradition">Tradition</option>
</select>
</div>


    <div class="interest">  
<select id="interest">
<option value='AA Literature' selected>AA Literature</option>
<option value='Agnostic'>Agnostic</option>
<option value='Beginners Workshop'>Beginners Workshop</option>
<option value='Big Book Topic'>Big Book Topic</option>
<option value='Big Book Workshop'>Big Book Workshop</option>
<option value='Came To Believe'>Came To Believe</option>
<option value='Children Welcome'>Children Welcome</option>
<option value='Daily Reflections'>Daily Reflections</option>
<option value='Eleventh Step'>Eleventh Step</option>
<option value='Eleventh Step Meditation'>Eleventh Step Meditation</option>
<option value='First Step Workshop'>First Step Workshop</option>
<option value='Fourth Step Workshop'>Fourth Step Workshop</option>
<option value='Gay Men'>Gay Men</option>
<option value='Gay, Lesbian and Bisexual'>Gay, Lesbian and Bisexual</option>
<option value='H.I.V Positive'>H.I.V Positive</option>
<option value='Interpreted for the Deaf'>Interpreted for the Deaf</option>
<option value='Lesbian'>Lesbian</option>
<option value='Living Sober'>Living Sober</option>
<option value='Medication'>Medication</option>
<option value='Meditation'>Meditation</option>
<option value='Meditation at Meeting'>Meditation at Meeting</option>
<option value='Men'>Men</option>
<option value='Mental Health Issues in Sobriety'>Mental Health Issues in Sobriety</option>
<option value='Promises'>Promises</option>
<option value='Round-Robin Meeting Format'>Round-Robin Meeting Format</option>
<option value='Special Purpose Groups'>Special Purpose Groups</option>
<option value='Spiritual Workshop'>Spiritual Workshop</option>
<option value='Sponsorship Workshop'>Sponsorship Workshop</option>
<option value='Steps 1-2-3'>Steps 1-2-3</option>
<option value='Topic'>Topic</option>
<option value='Twelve Steps'>Twelve Steps</option>
<option value='Under Six Months Sober'>Under Six Months Sober</option>
<option value='Women'>Women</option>
<option value='Young People'>Young People</option>
</select>
 </div>
 
<div class="wheelchair">
<label class="switch">
  <input id = "wheelchair" type="checkbox" name="wheelchair">
  <span class="slider round">Wheelchair</span>
</label>
</div>

  </div>
<button id="submit" type="button" onclick="submitRequest()">Find Meetings</button>
<div class="outputTime"></div>  
<div class="outputSelection"></div>
 </nav>
 
<div id="map"></div>
<script>
  var data = 
  `;
  
var jx = `; 
let result = [];

//****************Create Tile Layer
const mymap = L.map('map').setView([40.734636,-73.994997], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: 'meanmodemoda/ckwthwi6i3pdq15qjkx9eqqdj',
        accessToken: 'pk.eyJ1IjoibWVhbm1vZGVtb2RhIiwiYSI6ImNrd2duY203YzBxaDQyeHA4YmNqOWk4dWQifQ.p3OGSJeE4eG9XEkDwXEoxw'
    }).addTo(mymap);

//Construct queryInput Object
const queryInput={};

const inputTime = document.querySelector('input[type="time"]');
const ngbSelect = document.querySelector('#neighborhood');
const daySelect = document.querySelector('#day');
const typeSelect = document.querySelector('#type');
const interestSelect = document.querySelector('#interest');
const checkbox = document.querySelector('input[type="checkbox"]');

const inputArray = [ngbSelect,daySelect,typeSelect,interestSelect]
const keys = ["neighborhood","day","type","interest"]

for (let input of inputArray) {
    input.addEventListener('change', updateValue);
}

inputTime.addEventListener('input', outputTime);
checkbox.addEventListener("change",toggleAccess);


function updateValue(e) {
  let key = this.getAttribute("id");
  queryInput[key]=e.target.value;
    return queryInput;
    // console.log(queryInput);
}


function toggleAccess(e) {
 let key = this.getAttribute("id");
    if(e.target.checked===true) {
        queryInput[key]= e.target.checked;
    } else {
       delete queryInput[key];
    }
  return queryInput;
    // console.log(queryInput);
}


function outputTime(e) {
    const inputTime = e.target.value;
    const zero="0";
    const hours = inputTime.toString().substring(0,2);
    const minutes = inputTime.toString().substring(2,inputTime.length);
    
    if (hours>=12) {
        queryInput["ampm"]="PM";
        
        const newHour = parseInt(hours)-12;
        queryInput["clocktime"] = zero + newHour.toString() + minutes;
        
    } else {
        queryInput["ampm"]="AM";
        queryInput["clocktime"] = inputTime.toString();
    }
    
    return queryInput;
    // console.log(queryInput)
}

const submitInput = document.querySelector('#submit');

submitInput.addEventListener("click", submitRequest)

function submitRequest() {
    
    for (let key in queryInput) {
        
      result = data.filter(el => 
      el[key]===queryInput[key])
    }
    
    console.log(result)
    
    for (let i=0; i<result.length; i++) {
        L.marker([result[i].lat, result[i].long]).bindPopup("Hello").addTo(mymap);
    }  
}
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
</body>
</html>`;


app.get('/', function(req, res) {
    res.send('<h3>Code demo site</h3><ul><li><a href="/aa">aa meetings</a></li><li><a href="/processblog">process blog</a></li></ul>');
}); 

// respond to requests for /aa
app.get('/aa', function(req, res) {

    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);
    
    // SQL query 
    // var thisQuery = `SELECT lat, lon, json_agg(json_build_object('loc', mtglocation, 'address', mtgaddress, 'time', tim, 'name', mtgname, 'day', day, 'types', types, 'shour', shour)) as meetings
    //              FROM aadatall 
    //              WHERE day = ` + dayy + 'and shour >= ' + hourr + 
    //              `GROUP BY lat, lon
    //              ;`;
                 
var thisQuery = `SELECT json_build_object(DISTINCT a.groupName, m.zoneName, n.neighborhood, m.day, m.startTime, m.sAmPm, m.endTime, m.eAmPm, m.type, m.interest, c.address, a.crossStreet, c.long, c.lat, a.wheelChair) as meetings
                FROM groupMeetings m 
                LEFT JOIN groupAddresses a ON m.gid = a.gid AND m.zoneName=a.zoneName 
                LEFT JOIN addressCoordinates c ON a.address=c.inputAddress 
                LEFT JOIN neighborhoods n ON n.zonename=m.zoneName;`;

    client.query(thisQuery, (qerr, qres) => {
        if (qerr) { throw qerr }
        
        else {
            var resp = hx + JSON.stringify(qres.rows) + jx;
            res.send(resp);
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