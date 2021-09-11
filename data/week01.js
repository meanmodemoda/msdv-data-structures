//--------Class Notes ---------
//touch create a new file
//linux got module quick link
//fs filesystems is pre-installed in Node
//js does not execute/complete the code the way one writes
//require is a method built into node to load libraries/packages
//--------Class Notes ends -------

// npm install got
// mkdir data


const fs = require('fs');
const got = require('got');

//set the number of files as a variable loopNum
let loopNum=10;

//create a function that counts number of digits of any number
function getLength(num) {
	return num.toString().length;
}
//set a new variable that counts the digit of loopNum
let loopDigit=getLength(loopNum);

//create a function that creates a file number array in which each file number has fill-in 0s when needed;
//This function is still not very dynamic. Currently it can automate 4 digit, so if we need to loop through 1,000 files, it should work.
//I will need to edit the function further if the number of files gets bigger and I'd like to know how to dynamically do that.

function zeroFilled() {
  let j=[];
  for (let i=0; i<=loopNum; i++) {
    
    if (getLength(i)===loopDigit){
      j.push(i);}
    else if (getLength(i)===loopDigit-1){
     j.push('0'+ i);}
    else if (getLength(i)===loopDigit-2) {
      j.push('00'+ i);}
    else if (getLength(i)===loopDigit-3) {
      j.push('000'+ i);}
    else { break; 
    console.log('Edit function!');}
  }
  return j;
  }
  
let fileNum=zeroFilled();

//create a loop to loop through files

(async () => {
	for (var i=1; i<=loopNum; i++) {
		try {
		const response = await got('https://parsons.nyc/aa/m'+fileNum[i]+'.html');
		console.log(response.body);
		fs.writeFileSync('/home/ec2-user/environment/data/aa-m'+fileNum[i]+'.txt', response.body);
		//=> '<!doctype html> ...'
	} catch (error) {
		console.log(error.response.body);
		//=> 'Internal server error ...'
	}
	}
})();