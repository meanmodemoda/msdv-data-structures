//touch create a new file
//linux got module quick link
//fs filesystems is pre-installed in Node
//js does not execute/complete the code the way one writes
// npm install got
// mkdir data
//require is a method built into node to load libraries/packages

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

//create a function that create a file number that fills in 0s depending on the digit of the file number;
//this function is still not very dynamic, I will need to edit the function further if the number of files get bigger.

function zeroFilled() {
  let j=[];
  for (var i=0; i<=loopNum; i++) {
    
    if (getLength(i)===loopDigit){
      j.push(i);}
    else if (getLength(i)===loopDigit-1){
     j.push('0'+ i);}
    else if (getLength(i)===loopDigit-2) {
      j.push('00'+ i);}
    else if (getLength(i)===loopDigit-2) {
      j.push('000'+ i);}
  }
  return j;
  }
  
let fileNum=zeroFilled();
//create a loop to loop through 10 files

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