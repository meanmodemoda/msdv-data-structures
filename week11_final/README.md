### Summary
Create an application that queries both RDS and NoSQL databases and display query results to the front end.
##
### Assignment Details
- Install dependencies `express` (request handling), `handlebars`(templating), `moment` (time handling, deprecated), `leaflet` (mapping), `mapbox` (tile style). 
- Leverage `Node.js`,`express` and `handlebars` to create a process of sending query requests to databases and constructing query results into front end content.
- Minimum user input is involved in this project. Run the app in local Cloud 9. 


##
### Process
###
**Step 1**: Use static dummy data to construct and test front end templates. 

I broke down the starter code into sections and constructed the `aa meeting` and `process blog` html docs and tested them in local environment. 

The original test files are saved in [week11_draft_userinput]() folder.

**Step 2**: Send query requests to RDS and NoSQL databases.

In this part, I followed closely with the starter code. One notable challenge is in the `aa meeting` project, I need to create a template for the Leaflet tooltip. The construct of the SQL query output is a JSON composite array - an array of objects that contains both objects and arrays. Each pair of `long` and `lat` is mapped to an array of meeting info, which means the Leaflet tooltip info is nested below each `long` and `lat` pair.
I decided to create a function to return the nested meeting info result.

Below is the code to add tooltip to Leaflet.
```
for (let i=0; i<data.length; i++) {
    L.marker([data[i].lat, data[i].long]).bindPopup(createTooltip(data[i].meetings)).addTo(mymap);
}
```
The createTooltip function returns the nested meeting info for each `lang` and `lat` pair.

```
function createTooltip (meetings) {
    
    let wheelchair;
    let interest;
    let output="";
    
    for (let data of meetings) {
        
        if (data.wheelchair===false) {
         wheelchair = `No wheelchair access`;
     } else {
         wheelchair = `Wheelchair accessible<br><br><img src="Acc.svg" alt="Accessible" width="25" height="25">`;
    }
    if (data.interest==="null") {
         interest = ` `;
     } else {
         interest= `${data.interest}`;
     }     
         
  output += `<div class="tooltip"><div class="tooltip-header" style="color:#3852A7;"><h3>${data.groupname}</h3></div><div class="divider" style="background-color:#D7DF23;height:0.25px;"></div><br><b>${data.day}</b>
  <b>${data.starttime} ${data.sampm} - ${data.endtime} ${data.eampm}</b>
  <p>${data.type}<br>${data.address}</p><p class="extra">${interest}<br>${wheelchair}</p></div>`
        
    }
    
 return output;
}
```

It's also worth noting that I need to be careful with null value to ensure accurate querying even if it's out of the scope of this project. For instance, if the wheelchair toggle is turned off, it means the user is indifferent about whether the meeting is wheelchair accessible or not so the query should return both wheelchair `true` and `false` value, but if it's toggled on, the query should return `true` value. Toggling off is not the opposite of `true`.



```javascript
str.replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0')
```
- I didn't automate a loop for the 10 zones because each zone has its own wonkiness. I did a visual scan for the output of each zone. For edge cases where programatical tweaks are more effective, code is updated accordingly. However, sometimes, it just makes more sense to make a quick change manually and directly to the file.
- Once all 10 zones' data are collected, I combined them together in [week07_sql_combine.js](https://github.com/meanmodemoda/msdv-data-structures/blob/master/week07/week07_sql_combine.js).
- I used the full list of addresses to fetch the full list of geocode in [week07_sql_geocode.js](https://github.com/meanmodemoda/msdv-data-structures/blob/master/week07/week07_sql_geocode.js).
- Here I preserved the original addresses parsed from the data as `inputAddress` for the `addressCoordinates` table. I will use this field as the key to link back to the `groupAddresses` table. However, I would use `address`, cleaned and standardized from the geocode API as the actual address field for front end users to search and filter on.
- At each step, check points were put into place (i.e., console.logging array lengths and spot checks) to make sure the data is returned completely without missing records or having duplicates.
- Now everything is ready for writing into SQL.

**Step 3**: Writing into SQL
- Based on the diagram, I created three tables in the SQL database in [week07_create_sqltables.js](https://github.com/meanmodemoda/msdv-data-structures/blob/master/week07/week07_create_sqltables.js).
- Then I used template literals to write data into respective tables in [week07_fill_sqltables.js](https://github.com/meanmodemoda/msdv-data-structures/blob/master/week07/week07_fill_sqltables.js) and checked the final result for each table in [week07_check_sqltables.js](https://github.com/meanmodemoda/msdv-data-structures/blob/master/week07/week07_check_sqltables.js). The row counts of the tables match the lengths of the data arrays. 374 rows for `group` level data and 1206 rows for `meeting` level data are stored. 
- Finally, I joined the three tables in SQL and returned a select query in [week07_sql_querytables.js](https://github.com/meanmodemoda/msdv-data-structures/blob/master/week07/week07_sql_querytables.js).
<img src="./sql_query.png" width="1000" alt="SQL Query">