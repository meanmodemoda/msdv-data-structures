## Summary

Learn to use API to query, return and extract data. Extract the coordinates (`lat`,`lng`) of addresses saved in [aa-m01-address.json](https://github.com/meanmodemoda/msdv-data-structures/blob/master/data/aa-m01-address.json) from [Weekly Assignment 2](https://github.com/meanmodemoda/msdv-data-structures/blob/master/week02/week02.js) from [Texas A&M Geoservices Geocoding APIs](http://geoservices.tamu.edu/Services/Geocode/WebService/). 
<br />

### Assignment Details

Create [a free account with Texas A&M GeoServices](https://geoservices.tamu.edu/Signup/). Write a script that makes a request to the [Texas A&M Geoservices Geocoding APIs](http://geoservices.tamu.edu/Services/Geocode/WebService/) for each address, to extract additional data of the coordinates using the address data parsed and prepared from Weekly Assignment 2.
Only output an array that looks like the following and save to a JSON file. 
```js
[ 
  { address: '63 Fifth Ave, New York, NY', latLong: { lat: 40.7353041, lng: -73.99413539999999 } },
  { address: '16 E 16th St, New York, NY', latLong: { lat: 40.736765, lng: -73.9919024 } },
  { address: '2 W 13th St, New York, NY', latLong: { lat: 40.7353297, lng: -73.99447889999999 } } 
]
```

### Process

**Step 1 - Preparation**: 

* Install dependencies: `dotenv`, `querystring` and `async`
* Create `environment variable` for `API_KEY` , update `gitignore` and double check on github to make sure neither `.env` or `API_KEY` is exposed.
* Test out starter code, observe the structure of the `meetingsData` output, and identify the paths to extract `address`, `lat`, and `lng` as follows.

    - **address**:  `meetingsData[i]["InputAddress"]["StreetAddress"]`
    - **lat**: `meetingsData[i]["OutputGeocodes"][0]["OutputGeocode"]["Latitude"]`
    - **lng**: `lng:meetingsData[i]["OutputGeocodes"][0]["OutputGeocode"]["Longitude"]`
    

**Step 2 - Trim and clean `meetingsData`**: 

After extracting the raw addresses, I noticed the format was modified during the API query process as below:  a) streets are all caps, b) commas are removed.
```
    22 BARCLAY STREET New York NY
```

To update the addresses to the final output format, I added a function `toTitleCase()` using readily available code block online and called the function to change the address to title case up to before ` New York NY`.
```js
    toTitleCase(meetingsData[i]["InputAddress"]["StreetAddress"])
```
Next, I applied some string methods to remove ` New York NY` and add back `, New York, NY`.
```js
    toTitleCase(meetingsData[i]["InputAddress"]["StreetAddress"].split(" New York NY")[0]).concat(", New York, NY"),
```

**Step 3 - Write output to a new array `addressUpdate`**

Based on the required structure of the final output, I created a loop to fill in an empty array `addressUpdate` with objects that contain two objects `address` and `latLong`, with `latLong` made of `lat` and `lng`.

```javascript

    let addressUpdate = [];

    for (var i=0; i<meetingsData.length; i++) {
      addressUpdate[i] = {
            address: toTitleCase(meetingsData[i]["InputAddress"]["StreetAddress"].split(" New York NY")[0]).concat(", New York, NY"),
            latLong: {lat:meetingsData[i]["OutputGeocodes"][0]["OutputGeocode"]["Latitude"], lng:meetingsData[i]["OutputGeocodes"][0]["OutputGeocode"]["Longitude"]}
      };
}

```

**Step 4 :  Write the `addressUpdate` array into a JSON file**


### Reflections

1. I noticed the coordinates' digits/decimal points were truncated in the API query return. (Aaron: JavaScript sometimes tries to format when it can but there is a way to turn it off.)
2. Try to put `.env` in the root directory. You can put a separate file in a sub-category in `gitignore`?
3. The reason why the output array's object keys have quotation marks is the file is stringified and not real JSON. Once it's JASON.parsed, the quotation marks will not appear. 
4. I played around with creating an `object constructor` but later on deemed it was not necessary. But when will it be neccessary? (Save this question for later)

  
My understanding of the starter code

<img src="/images/week03_startercode_diagram.jpg" width="600" alt="starter code diagram">
