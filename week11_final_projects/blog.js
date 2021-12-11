/*global Leaflet*/
//install sass

//mapbox setup

const data = [
    {
      "groupname": "A Design For Living",
      "gid": 1,
      "zonename": "m01",
      "neighborhood": "Tribeca",
      "day": "Thursday",
      "starttime": "07:00",
      "sampm": "AM",
      "starttime": "08:00",
      "eampm": "AM",
      "type": "Open Discussion",
      "interest": "AA Literature",
      "address": "20 Cardinal Hayes Pl, New York, NY",
      "crossstreet": "(Between Duane and Pearl Streets)",
      "long": -74.0023994478748,
      "lat": 40.7132597018695,
      "wheelchair": false
    },
    
    {
      "groupname": "Downtown",
      "gid": 4,
      "zonename": "m01",
      "neighborhood": "Tribeca",
      "day": "Monday",
      "starttime": "07:00",
      "sampm": "AM",
      "starttime": "08:00",
      "eampm": "PM",
      "type": "Open Discussion",
      "interest": "AA Literature",
      "address": "49 Fulton St, New York, NY",
      "crossstreet": "(@ Pearl Street)",
      "long": -74.0042375398091,
      "lat": 40.7080475730195,
      "wheelchair": true
    },
           {
      "groupname": "Exchange Views @ John Street Church",
      "gid": 5,
      "zonename": "m01",
      "neighborhood": "Tribeca",
      "day": "Thursday",
      "starttime": "12:15",
      "sampm": "PM",
      "starttime": "01:15",
      "eampm": "PM",
      "type": "Open Discussion",
      "interest": "null",
      "address": "44 John St, New York, NY",
      "crossstreet": "null",
      "long": -74.0081,
      "lat": 40.7092,
      "wheelchair": false
    }]

// const dataTest = data.filter(d => d.neighborhood=== 'Tribeca')
// console.log(data[1].neighborhood)
// console.log(dataTest)
const mymap = L.map('map').setView([40.734636,-73.994997], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: 'meanmodemoda/ckwthwi6i3pdq15qjkx9eqqdj',
        accessToken: 'pk.eyJ1IjoibWVhbm1vZGVtb2RhIiwiYSI6ImNrd2duY203YzBxaDQyeHA4YmNqOWk4dWQifQ.p3OGSJeE4eG9XEkDwXEoxw'
    }).addTo(mymap);
    
    
 for (let i=0; i<data.length; i++) {
        L.marker( [data[i].lat, data[i].long]).bindPopup(`<b>${JSON.stringify(data[i].groupname)}</b><p>${JSON.stringify(data[i].interest)}</p><p>${JSON.stringify(data[i].type)}</p>`).addTo(mymap);
    }    
    
//Construct queryInput object
const queryInput={};

const input = document.querySelector('input[type="time"]');

const ngbSelect = document.querySelector('#neighborhood');
const daySelect = document.querySelector('#day');
const typeSelect = document.querySelector('#type');
const interestSelect = document.querySelector('#interest');
const checkbox = document.querySelector('input[type="checkbox"]');

input.addEventListener('input', outputTime);

function outputTime(e) {
    
   
    const inputTime = e.target.value;
    const zero="0";
    const hours = inputTime.toString().substring(0,2);
    const minutes = inputTime.toString().substring(2,inputTime.length);
    
    if (hours>=12) {
        queryInput["ampm"]="PM";
        
        const newHour = parseInt(hours)-12;
        queryInput["clocktime"] = zero + newHour.toString() + minutes;
        
    } else {
        queryInput["ampm"]="AM";
        queryInput["clocktime"] = inputTime.toString();
    }
    
    return queryInput;
//   console.log(queryInput);
}


ngbSelect.addEventListener('change', function(e) {
    queryInput["neighborhood"]=e.target.value;
  });
  
daySelect.addEventListener('change', function(e) {
    queryInput["day"]=e.target.value;
  });

typeSelect.addEventListener('change', function(e) {
    queryInput["type"]=e.target.value;
  });
  
interestSelect.addEventListener('change', function(e) {
    queryInput["interest"]=e.target.value;
  });
  

checkbox.addEventListener('change', function() {
    
  if (this.checked) {
    queryInput["wheelchair"]= true;
  } else {
    return;}

});


const dataFiltered = data.filter(d => 
    d.day === queryInput.day)

    
console.log(data) 
console.log(queryInput)
console.log(dataFiltered)



// const dataFiltered = data.filter(d => 
//     d.neigbhorhood ==queryInput.neighborhood &&
//     d.day == queryInput.day &&
//     d.starttime == queryInput.clocktime &&
//     d.sampm ==queryInput.ampm &&
//     d.type == queryInput.type &&
//     d.interest == queryInput.interest &&
//     d.wheelchair == queryInput.wheelchair)
