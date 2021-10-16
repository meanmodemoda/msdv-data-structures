//This version has been updated. File preserved for future refrence.
var fs = require('fs');
var cheerio = require('cheerio');


var content = fs.readFileSync('/home/ec2-user/environment/data/aa-m01.txt');
var $ = cheerio.load(content);


//I discovered that 'td:nth-child(2)'` is a unique identifier of the block of content related to meeting time. Hence, I re-used this element as an achor point to locate the address block content. 
const timeBlock = $('td:nth-child(2)')
const addressBlock = $('td:nth-child(2)').prev()

//----------------------------1. Location Table

//Step 1: Extract address Info
let addPrep = []; 
    
addressBlock.each(function(i, elem) {
    addPrep.push($(elem).html().split('<br>')[2].trim().split(',')[0])
});

//Step 2: Clean and prepare location table
let location = [];

addPrep.forEach((item, i) => { 
     location.push({
         gid: i+1,
         address: (item.includes('Street')? item.substring(0,item.indexOf('Street')+6) : item)
     })
    
})

console.log("***********Location Table Reads **********");
console.log(location)

//-------------------------------2. Group Meetings

//Step 1: Extract group meeting information

let groups = [];

timeBlock.each(function(i, elem) {
     groups.push($(elem)
        .text()
        .split('\n')
        .map(item => item.trim())
        .filter ( a => a)
        .map(item => item.split(' '))
        .filter ( a => a))
 })

// console.log("************* Initial Group Meeting Array Reads ************");
// console.log(groups[4]);

//Step 2: Convert group meeting information into nested arrays

class MeetingEntry {
  constructor(day, start, sampm, end, eampm,type) {
    this.day = day.substring(0,day.length-1);
    this.start = start + ' ' + sampm;
    this.end = end + ' ' + eampm;
    this.type = type;
    }
  }


let groupsUpdated = [];

groups.map(group => {
    
    let meetings = [];
    for (let i=0; i<group.length; i++) {
        meetings.push(new MeetingEntry(group[i][0],group[i][3],group[i][4],group[i][6],group[i][7],group[i][10]))
    }
    
    groupsUpdated.push(meetings)
    
})


// console.log("************* Updated Group Meeting Array Reads **********");
// console.log(groupsUpdated[4])

//Step 3: Add gid to each element of the array

let groupsFinal = [];

groupsUpdated.forEach((item, i) => {
    groupsFinal.push({
        gid: i+1,
        meetings: groupsUpdated[i]
    })
})


console.log("************* Final Group Array Reads **********");
console.log(groupsFinal[4])







//write into a json file that is stringified for json compliance

// fs.writeFileSync('/home/ec2-user/environment/data/aa-m01-address.json',  JSON.stringify(addSave), function(err) {
//     if (err) throw err;
//     console.log('complete');
//     }
// );

// console.log('Number of Address Records:' +addPrep.length);

//below shows raw addresses parsed
//fs.writeFileSync('../data/aa-m01-address.txt', addPrep);
