//npm install got async dotenv querystring

const fs = require('fs'),
    cheerio = require('cheerio'),
      async = require('async')

var content = fs.readFileSync('/home/ec2-user/environment/data/aa-m01.txt');
var $ = cheerio.load(content);


//I discovered that 'td:nth-child(2)'` is a unique identifier of the block of content related to meeting time. Hence, I used this element as an achor point to locate the address block content. 
const meetingContent = $('td:nth-child(2)')
const addressContent = $('td:nth-child(2)').prev()

//----------------------------1. Create Location Table (locations need to link to a unique group)

//Step 1: Extract address information
let locPrep = []; 
    
addressContent.each(function(i, elem) {
    locPrep.push($(elem).html().split('<br>')[2].trim().split(',')[0])
});

//Step 2: Clean and prepare location table
let location = [];

locPrep.forEach((item, i) => { 
     location.push({
         gid: i+1,
         address: (item.includes('Street')? item.substring(0,item.indexOf('Street')+6) : item)
     })
    
})

console.log("***********Location Table **********");
console.log(location)

//-------------------------------2. Create Group Meeting Table (meetings need to link to a unique group)

//Step 1: Extract group meeting information
let groupMeetings = [];

meetingContent.each(function(i, elem) {
     groupMeetings.push($(elem)
        .text()
        .split('\n')
        .map(item => item.trim())
        .filter ( a => a)
        .map(item => item.split(' '))
        .filter ( a => a))
 })

console.log("************* Initial Group Meeting Content ************");
console.log(groupMeetings[4]);

//Step 2: Prepare group meeting table
let meetings = [];

groupMeetings.forEach((group,i) => {
    
    let meeting = [];

    for (let j=0; j<group.length; j++) {   
        meeting.push(
            {   gid: i+1,
                mtgday: group[j][0].substring(0,group[j][0].length-1),
                mtgstart: group[j][3] + ' ' + group[j][4],
                mtgend: group[j][6]+ ' ' + group[j][7],
                mtgtype: group[j][10]
         })}
        
    meetings.push(meeting);
    })


console.log("************* Group Meeting Table **********");
console.log(meetings[5])

//Step 3: Flatten meeting table

let flatmeetings = [];

meetings.map( m => {
    for (m of m) {
        flatmeetings.push(m)
    }
})

console.log("************* Flat Meeting Table **********");
console.log("Number of Meeting Records: " + flatmeetings.length);


//write into a json file that is stringified for json compliance

fs.writeFileSync('/home/ec2-user/environment/data/aa-m01-meeting.json',  JSON.stringify(flatmeetings), function(err) {
    if (err) throw err;
    console.log('complete');
    }
);

console.log('Number of Address Records:' +meetings.length);
