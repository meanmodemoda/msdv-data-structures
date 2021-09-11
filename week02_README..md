## Summary

Learn to use ceerio to extract and save content. Extract addresses only from aa-m01.txt and save the addresses to a separte file. 


### Assignment Details

Observe HTML element structure, use appropriate selectors to extract address content. Use various string methods to clean up content and save to a json file. 

### Process

**Step 1**: Identify smallest extractable element, in this case a block of content within a `td`, using "Copy JS path" function in DevTools. (Credit: Jeremy Odell)

- Observation 1: the difference in path between addresses is the last `tr` element, which I can use a loop-ish method to represent `tr:nth-child(n+1)`

1st address block path: "body > center > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > div > table > tbody > tr:nth-child(1) > td:nth-child(1)"
2nd address block path: "body > center > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > div > table > tbody > tr:nth-child(2) > td:nth-child(1)"
....
5th address block path: "body > center > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > div > table > tbody > tr:nth-child(5) > td:nth-child(1)"
" 
<br>
- Observation 2: can not easily extract texts between `<br>`, therefore, I need to preserve the content in HTML using `html()` first and use `<br>` as a splitter.

I used the following block of code to get an array of raw addresses.


```javascript
var addPrep = []; 

$('tbody > tr > td > table > tbody > tr:nth-child(2) > td > div > table > tbody > tr:nth-child(n+1) > td:nth-child(1)').each(function(i, elem) {
    
    addPrep.push($(elem).html().split('<br>')[2].trim().split(',')[0])
});

```

**Step 2**: Remove miscellaneous text

I noticed there were still some clean up work need to be done with these two addresses. 



    20 Cardinal Hayes Place,22 Barclay Street (Basement),
    22 Barclay Street- basement chapel,


I created a function to check if the address contains `"Street"` keyword, if so return the address before and including `"Street"`.


```javascript
let addSave=addPrep.map((item) => {
  return (item.includes('Street')? item.substring(0,item.indexOf('Street')+6) : item);
})

```

Finally, I created an empty JSON object and write the cleaned up addresses to a JSON file using code I found online.

```javascript
var data ={};
data.address = [];
data.address.push(addSave);

fs.writeFileSync('../data/aa-m01-address.json',  JSON.stringify(data), function(err) {
    if (err) throw err;
    console.log('complete');
    }
);

```

### Reflection

1. I spent a lot of time iternating my last function of returning an address before and including `"Street"`. In the end, I'm pretty happy that I was able to use `tenary operator` and the `array.map()` method I learned during the summer workshop. 
2. I think there is another way selecting the address `td` block targeting `attribute` but I chose to experiement with JS path.