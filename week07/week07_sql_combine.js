const fs = require('fs')


let loopNum=10;

//create a function that counts number of digits of any number
function getLength(num) {
	return num.toString().length;
}

//finally learned to create a simple callback function
function zeroFilled(loopNum, callback) {
  let j=[];
  for (let i=1; i<=loopNum; i++) {
    
    if (callback(i)===callback(loopNum)){
      j.push(i.toString());}
    else if (callback(i)===callback(loopNum)-1){
     j.push('0'+ i);}
    else if (callback(i)===callback(loopNum)-2) {
      j.push('00'+ i);}
    else if (callback(i)===callback(loopNum)-3) {
      j.push('000'+ i);}
    else { console.log("Edit function!"); break;}
  }
  return j;
  }
  
let fileNumArray=zeroFilled(loopNum, getLength);
//['01', '02', '03','04', '05', '06','07', '08', '09','10']

console.log(fileNumArray);

let rowNum = 0;
let addressArray = [];
let meetingArray = [];

for (let i=0; i<loopNum; i++) {
    
    let addressFiles = JSON.parse(fs.readFileSync("/home/ec2-user/environment/data/aa_cleaned/aa-m"+fileNumArray[i]+"-groupAddresses.json"));
    
    addressFiles.map(file => addressArray.push(file))
    
    console.log("row count is ", addressFiles.length, ", total row count is ", rowNum += addressFiles.length)
    
}

// console.log("final round count is ", addressArray.length)


for (let i=0; i<loopNum; i++) {
    
    let meetingFiles = JSON.parse(fs.readFileSync("/home/ec2-user/environment/data/aa_cleaned/aa-m"+fileNumArray[i]+"-groupMeetings.json"));
    
    meetingFiles.map(file => meetingArray.push(file))
    
    console.log("row count is ", meetingFiles.length, ", total row count is ", rowNum += meetingFiles.length)
    
}

// meetingArray.forEach((elem,i) => elem.mid=i+1)

console.log("final round count is ", meetingArray.length)


// fs.writeFileSync('/home/ec2-user/environment/data/aa_cleaned/groupAddresses.json',  JSON.stringify(addressArray), function(err) {
//     if (err) throw err;
//     console.log('complete');
//     }
// );


// fs.writeFileSync('/home/ec2-user/environment/data/aa_cleaned/groupMeetings.json',  JSON.stringify(meetingArray), function(err) {
//     if (err) throw err;
//     console.log('complete');
//     }
// );
