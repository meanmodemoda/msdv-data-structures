/*global Leaflet*/
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
      "endtime": "01:15",
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
      "endtime": "01:15",
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
      "endtime": "01:15",
      "eampm": "PM",
      "type": "Open Discussion",
      "interest": "null",
      "address": "44 John St, New York, NY",
      "crossstreet": "null",
      "long": -74.0081,
      "lat": 40.7092,
      "wheelchair": false
    }];

let result = [];
// const dataTest = data.filter(d => d.neighborhood=== 'Tribeca')
// console.log(data[1].neighborhood)
// console.log(dataTest)

//****************Create Tile Layer
const mymap = L.map('map').setView([40.734636,-73.994997], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: 'meanmodemoda/ckwthwi6i3pdq15qjkx9eqqdj',
        accessToken: 'pk.eyJ1IjoibWVhbm1vZGVtb2RhIiwiYSI6ImNrd2duY203YzBxaDQyeHA4YmNqOWk4dWQifQ.p3OGSJeE4eG9XEkDwXEoxw'
    }).addTo(mymap);

//Construct queryInput Object
const queryInput={};

const inputTime = document.querySelector('input[type="time"]');
const ngbSelect = document.querySelector('#neighborhood');
const daySelect = document.querySelector('#day');
const typeSelect = document.querySelector('#type');
const interestSelect = document.querySelector('#interest');
const checkbox = document.querySelector('input[type="checkbox"]');

const inputArray = [ngbSelect,daySelect,typeSelect,interestSelect]
const keys = ["neighborhood","day","type","interest"]

for (let input of inputArray) {
    input.addEventListener('change', updateValue);
}

inputTime.addEventListener('input', outputTime);
checkbox.addEventListener("change",toggleAccess);


function updateValue(e) {
  let key = this.getAttribute("id");
  queryInput[key]=e.target.value;
    return queryInput;
    // console.log(queryInput);
}


function toggleAccess(e) {
 let key = this.getAttribute("id");
    if(e.target.checked===true) {
        queryInput[key]= e.target.checked;
    } else {
       delete queryInput[key];
    }
  return queryInput;
    // console.log(queryInput);
}


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
    // console.log(queryInput)
}

const submitInput = document.querySelector('#submit');

submitInput.addEventListener("click", submitRequest)

function submitRequest() {
    
    for (let key in queryInput) {
        
      result = data.filter(el => 
      el[key]===queryInput[key])
    }
    
    console.log(result)
    
    for (let i=0; i<result.length; i++) {
        L.marker([result[i].lat, result[i].long]).bindPopup(createTooltip(result[i])).addTo(mymap);
    }  
}

//****************Create Tooltip   
function createTooltip (data) {
    
    let wheelchair;
    let interest;
    
     if (data.wheelchair===false) {
         wheelchair = `No wheelchair access`;
     } else {
         wheelchair = `Wheelchair accessible<br><br><img src="./assets/Acc.svg" alt="Accessible" width="25" height="25">`;
    }
    if (data.interest==="null") {
         interest = ` `;
     } else {
         interest= `${data.interest}`;
     }     
         
  let output = `<div class="tooltip"><div class="tooltip-header" style="color:#3852A7;"><h3>${data.groupname}</h3></div><div class="divider" style="background-color:#D7DF23;height:0.25px;"></div><br><b>${data.day}</b>
  <b>${data.starttime} ${data.sampm} - ${data.endtime} ${data.eampm}</b>
  <p>${data.type}<br>${data.address}</p><p class="extra">${interest}<br>${wheelchair}</p></div>`
  
   
 return output;
}


//Test Output
// const outputTimeArea = document.querySelector('.outputTime');
// const outputArea = document.querySelector('.outputSelection');


// function addText(e) {
    
//   outputTimeArea.innerHTML+=this.getAttribute("id")
//     outputArea.innerHTML+=e.target.value;
// }  

// for (let input of inputArray) {
//     input.addEventListener('change', addText);
// }
  


