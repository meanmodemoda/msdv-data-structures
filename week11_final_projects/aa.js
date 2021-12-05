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
      "endtime": "08:00",
      "eampm": "AM",
      "type": "Open Discussion",
      "interest": "null",
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
      "sampm": "PM",
      "endtime": "08:00",
      "eampm": "PM",
      "type": "Open Discussion",
      "interest": "null",
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
      "endtime": "01:15",
      "eampm": "PM",
      "type": "Open Discussion",
      "interest": "null",
      "address": "44 John St, New York, NY",
      "crossstreet": "null",
      "long": -74.0081,
      "lat": 40.7092,
      "wheelchair": false
    }]

console.log(data[0].lat)
const mymap = L.map('map').setView([40.734636,-73.994997], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: 'meanmodemoda/ckwthwi6i3pdq15qjkx9eqqdj',
        accessToken: 'pk.eyJ1IjoibWVhbm1vZGVtb2RhIiwiYSI6ImNrd2duY203YzBxaDQyeHA4YmNqOWk4dWQifQ.p3OGSJeE4eG9XEkDwXEoxw'
    }).addTo(mymap);
    
    
 for (var i=0; i<data.length; i++) {
        L.marker( [data[i].lat, data[i].long]).bindPopup(`<b>${JSON.stringify(data[i].groupname)}</b><p>${JSON.stringify(data[i].interest)}</p><p>${JSON.stringify(data[i].type)}</p>`).addTo(mymap);
    }    