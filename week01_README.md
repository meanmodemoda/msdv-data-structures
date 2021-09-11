## Summary

Set up github repo and learn to fetch html files and store them locally using Node.js `got` method.


### Assignment Details

Use Node.js `got` method to extract html body content of 10 Manhattan AA meeting links and save them into text files. Create a loop to loop through the urls and save the text files accordingly. 

### Process

**Iteration 1**: Create a loop that loops through indexed html urls and save text files in corresponding indice.

**Iteration 2**: Addressing naming convention issue of filling 0s in filename variables.

If we have 10 files, we name 1st file *"01"*, 2nd file *"02"*...10th file *"10"*. What if we have 1,000 files? We will name 1st file *"0001"*, 99th file *"0099"* and 876th file *"0876"*.

It's beneficial to fill in 0s in the files because it preserves the sorting order of files - it can get problematic when the files get bigger. I attempted to address the efficiency and scalability of this process. 


The naming of the files depends on the total number of files as well as the sequence of the files themselves. 

* For 1st file, its digit count is 1, while the digit count of 1,000 is 4, therefore 3 "0"s (4-1) need to be filled in.
* For 99th file, its digit count is 2, 2 "0"s (4-2) need to be filled.
* For 876th file, its digit count is 3, 1 "0" (4-3) need to be filled.

Based on this logic, I created a small function `getLength` that counts the digits of any given number. I assigned the digit count of total number of files to `loopDigit`, then I created the `zeroFilled` function below which returns an array of filename variables that looks like `[0001,0002,0003....,0998,0999,1000]` should we need to loop through 1,000 files.

```javascript
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

```

Finally, I defined a new variable `filNum` that is the output of the `zeroFilled` function. 

```javascript
let fileNum=zeroFilled();
```

With `filNum`, I created literal templates for both the indexed HTML urls and text file names.

```javascript
'https://parsons.nyc/aa/m'+fileNum[i]+'.html'
'/home/ec2-user/environment/data/aa-m'+fileNum[i]+'.txt'
```

I modified the provided starter code to loop through the HTML urls and saved the text files accordingly.

```javascript
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
```

### Reflection

1. I updated the `zeroFilled` function based on Prof. Hill's instruction to add an `else` statement to close the conditional loop.
2. There must be ways to simplify my functions further and hopefully I will improve my coding skills over time to improve them.