
var fs = require('fs');
var cheerio = require('cheerio');

// load the aa-m01 text file into a variable, `content`
// this is the file that we created in week01.js

var content = fs.readFileSync('/home/ec2-user/environment/data/aa-m01.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);


// write all addresses into a text file

//1: identify smallest extractable element using copy JS path in DevTools
//2: observe JS path patterns and identify differentiator: tr:nth-child(n+1) 
//3: extract address text block, and use various string methods to extract only the raw addresses and save them to an array named addPrep

var addPrep = []; 

$('tbody > tr > td > table > tbody > tr:nth-child(2) > td > div > table > tbody > tr:nth-child(n+1) > td:nth-child(1)').each(function(i, elem) {
    
    addPrep.push($(elem).html().split('<br>')[2].trim().split(',')[0])
});

//after observing the output, I noticed there are some miscellaneous texts behind certain addresses need to be cleaned up (i.e., some address ended like "Street (Basement)".
//The addSave function removes unecessary text after "Street".


let addSave=addPrep.map((item) => {
  return (item.includes('Street')? item.substring(0,item.indexOf('Street')+6) : item);
})


//create json file and push addSave to json file and save json file locally
var data ={};
data.address = [];
data.address.push(addSave);

fs.writeFileSync('/home/ec2-user/environment/data/aa-m01-address.json',  JSON.stringify(data), function(err) {
    if (err) throw err;
    console.log('complete');
    }
);

//below shows raw addresses parsed
//fs.writeFileSync('../data/aa-m01-address.txt', addPrep);