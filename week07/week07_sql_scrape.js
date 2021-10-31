//This version has been updated. File preserved for future refrence.
var fs = require('fs');
var cheerio = require('cheerio');

const zoneName ="m10";

var content = fs.readFileSync(`/home/ec2-user/environment/data/aa-${zoneName}.txt`);
var $ = cheerio.load(content);

//-----------------------------1. Prepare Scraping Elements and Tools

const addressBlocks = $('td:nth-child(2)').prev()

const meetingBlocks = [];

$('td:nth-child(2)').each(function(i, elem) {
  meetingBlocks.push($(elem).text().split('\n').map(item => item.trim()).filter(a => a))
})

// console.log(meetingBlocks)

function toTitleCase(str) {
  return str.toLowerCase().split(' ').map(function (word) {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ');
};   

//----------------------------2. Create groupAddresses Table from `addressBlocks` element

 class GroupAddress {
  constructor(zoneName, gid, address, groupName, crossStreet, notes, wheelChair) {
    this.zoneName = {};
    this.zoneName.S = zoneName;
    this.gid = {};  
    this.gid.N = gid;  
    this.address = {};
    this.address.S = address.includes('Street')? address.substring(0,address.indexOf('Street')+6) : address;
    this.groupName = {};
    this.groupName.S = toTitleCase(groupName).replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0')|| null;
    this.crossStreet = {};
    this.crossStreet.S= crossStreet!== null? crossStreet[0].replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0'): crossStreet;
    this.notes = {};
    this.notes.S= notes.replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0')|| null;
    this.wheelChair = {};
    this.wheelChair.BOOL = wheelChair !== null? true : false;}
  }
  
let groupAddresses = []; 
    
addressBlocks.each(function(i, elem) {
    
 let gid = i+1,
    address = $(elem).html().split('<br>')[2].trim().split(',')[0],
    groupName = $(elem).html().split('<b>')[1].split('-')[0].trim(),
    crossStreet = $(elem).html().split('<br>')[3].match(/\(.*?\)/g),
    notes = $(elem).find('div').text().trim(),
    wheelChair = $(elem).text().trim().match(/(Wheelchair access)/gm)
    // console.log(notes) 
 
 groupAddresses.push(new GroupAddress(zoneName,gid,address, groupName, crossStreet, notes, wheelChair))
   
});

console.log(groupAddresses)
console.log(groupAddresses.length)


//-------------------------------3. Create flatMeetings Table from `meetingBlocks` array

class MeetingEntry {
  constructor(zoneName, gid, day, start, sAmPm, end, eAmPm,typeCode, interest,type) {
    this.zoneName = {};
    this.zoneName.S = zoneName;
    this.gid = {};  
    this.gid.N = gid;  
    this.day = {};
    this.day.S = day.substring(0,day.length-1);
    this.start = {};
    this.start.S = start.length!==5? "0"+start : start
    this.sAmPm = {};
    this.sAmPm.S = sAmPm;
    this.end = {};
    this.end.S = end.length!==5? "0"+end : end
    this.eAmPm = {};
    this.eAmPm.S = eAmPm;
    this.typeCode = {};
    this.typeCode.S= typeCode;
    this.interest = {};
    this.interest.S = interest || null; //if undefined return null
    this.type ={};
    this.type.S = type!==null? type.split(" meeting")[0] : type;
  
  }
  }

let groupMeetings = [];

meetingBlocks.forEach((group, j) => {
    
    let meetings = [];
        
    for (let i=0; i<group.length; i++) {
        
        let gid = j+1,
            day = group[i].split(' ')[0],
            start = group[i].split(' ')[3],
            sAmPm = group[i].split(' ')[4],
            end = group[i].split(' ')[6],
            eAmPm =group[i].split(' ')[7],
            typeCode = group[i].split(' ')[10],
            interest = group[i].split('Special Interest ')[1],
            type = group[i].split("= ")[1] || null
        
     meetings.push(new MeetingEntry(zoneName, gid, day, start, sAmPm, end, eAmPm,typeCode, interest,type))
    }
    groupMeetings.push(meetings)
})


// console.log(groupMeetings.length)
// console.log(groupMeetings[4])

//-----Flatten meeting table for SQL ingestion 

let flatMeetings = [];

groupMeetings.map( m => {
    for (m of m) {
        flatMeetings.push(m)
    }
})


// // console.log(flatMeetings)
// console.log("Number of Meeting Records: " + flatMeetings.length);


// // //write into a json file that is stringified for json compliance

// fs.writeFileSync(`/home/ec2-user/environment/data/aa_cleaned/aa-${zoneName}-groupMeetings.json`,  JSON.stringify(flatMeetings), function(err) {
//     if (err) throw err;
//     console.log('complete');
//     }
// );

// fs.writeFileSync(`/home/ec2-user/environment/data/aa_cleaned/aa-${zoneName}-groupAddresses.json`,  JSON.stringify(groupAddresses), function(err) {
//     if (err) throw err;
//     console.log('complete');
//     }
// );
