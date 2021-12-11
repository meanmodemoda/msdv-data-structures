
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
    
    
// function createTooltip (arr) {
    
//   let output = "";
    
// arr.forEach((el,i) => {
//     output +=`<b>${JSON.stringify(el.groupname)}</b><p>${JSON.stringify(el.interest)}</p><p>${JSON.stringify(el.type)}</p>`
// })
   
// return output;
// }



// createTooltip(data)

function createTooltip (data) {
    
  let output = `<b>${JSON.stringify(data.groupname)}</b><p>${JSON.stringify(data.interest)}</p><p>${JSON.stringify(data.type)}</p>`
   
 console.log(output);
}

createTooltip(data[0])