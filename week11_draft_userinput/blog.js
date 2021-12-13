
// const fs = require('fs');
// const blog = JSON.parse(fs.readFileSync('./dealblog.json'));
// console.log(blog)
let data = [
  {
    title: 'G-III to Acquire Sonia Rykiel' ,
    dt:  '1632787200000' ,
    updatedAt:  'Tue Sep 28 2021',
    country:  'United States' ,
    region:  'North America',
    industry: 'apparel' ,
    Year: '2021',
    content:
    'G-III Apparel Group revealed that it has entered into an agreement to purchase Sonia Rykiel, with plans to accelerate the relaunch of the French fashion brand primarily in Europe, for the fall of 2022, with collections across multiple categories. The transaction, which comes less than two years after brothers Eric and Michael Dayan successfully bid to acquire all of the bankrupt brand’s assets via a court-administered process. (Those assets included the brand’s intellectual property rights (namely, its various global trademark registrations, and decades of archives and product prototypes); the commercial leases for its brick-and-mortar outposts in France – from its Saint Germain flagship to a glitzy boutique in Cannes, among others; and its remaining stock of garments and accessories.)The deal is expected to close by the end of October 2021.'
  },
  
   {
    title: 'G-III to Acquire Sonia Rykiel' ,
    dt:  '1632787200000' ,
    updatedAt:  'Tue Sep 28 2021',
    country:  'United States' ,
    region:  'North America',
    industry: 'footwear' ,
    Year: '2021',
    content:
    'G-III Apparel Group revealed that it has entered into an agreement to purchase Sonia Rykiel, with plans to accelerate the relaunch of the French fashion brand primarily in Europe, for the fall of 2022, with collections across multiple categories. The transaction, which comes less than two years after brothers Eric and Michael Dayan successfully bid to acquire all of the bankrupt brand’s assets via a court-administered process. (Those assets included the brand’s intellectual property rights (namely, its various global trademark registrations, and decades of archives and product prototypes); the commercial leases for its brick-and-mortar outposts in France – from its Saint Germain flagship to a glitzy boutique in Cannes, among others; and its remaining stock of garments and accessories.)The deal is expected to close by the end of October 2021.'
  },
  
  
    {
    title: 'ABCFEF' ,
    dt:  '1632787200000' ,
    updatedAt:  'Tue Sep 28 2021',
    country:  'United States' ,
    region:  'North America',
    industry: 'footwear' ,
    Year: '2021',
    content:
    'G-III Apparel Group revealed that it has entered into an agreement to purchase Sonia Rykiel, with plans to accelerate the relaunch of the French fashion brand primarily in Europe, for the fall of 2022, with collections across multiple categories. The transaction, which comes less than two years after brothers Eric and Michael Dayan successfully bid to acquire all of the bankrupt brand’s assets via a court-administered process. (Those assets included the brand’s intellectual property rights (namely, its various global trademark registrations, and decades of archives and product prototypes); the commercial leases for its brick-and-mortar outposts in France – from its Saint Germain flagship to a glitzy boutique in Cannes, among others; and its remaining stock of garments and accessories.)The deal is expected to close by the end of October 2021.'
  },
  
      {
    title: 'Happy Go Lucky' ,
    dt:  '1632787200000' ,
    updatedAt:  'Tue Sep 28 2021',
    country:  'United States' ,
    region:  'North America',
    industry: 'footwear' ,
    Year: '2021',
    content:
    'G-III Apparel Group revealed that it has entered into an agreement to purchase Sonia Rykiel, with plans to accelerate the relaunch of the French fashion brand primarily in Europe, for the fall of 2022, with collections across multiple categories. The transaction, which comes less than two years after brothers Eric and Michael Dayan successfully bid to acquire all of the bankrupt brand’s assets via a court-administered process. (Those assets included the brand’s intellectual property rights (namely, its various global trademark registrations, and decades of archives and product prototypes); the commercial leases for its brick-and-mortar outposts in France – from its Saint Germain flagship to a glitzy boutique in Cannes, among others; and its remaining stock of garments and accessories.)The deal is expected to close by the end of October 2021.'
  },
  
  
      {
    title: 'Happy Go Lucky' ,
    dt:  '1632787200000' ,
    updatedAt:  'Tue Sep 28 2021',
    country:  'United States' ,
    region:  'North America',
    industry: 'apparel' ,
    Year: '2021',
    content:
    'G-III Apparel Group revealed that it has entered into an agreement to purchase Sonia Rykiel, with plans to accelerate the relaunch of the French fashion brand primarily in Europe, for the fall of 2022, with collections across multiple categories. The transaction, which comes less than two years after brothers Eric and Michael Dayan successfully bid to acquire all of the bankrupt brand’s assets via a court-administered process. (Those assets included the brand’s intellectual property rights (namely, its various global trademark registrations, and decades of archives and product prototypes); the commercial leases for its brick-and-mortar outposts in France – from its Saint Germain flagship to a glitzy boutique in Cannes, among others; and its remaining stock of garments and accessories.)The deal is expected to close by the end of October 2021.'
  }
  
  ]
  
console.log(data[0])


const industryPicker = document.querySelector("#industry")
const blogArea = document.querySelector(".blog")



function updateValue (e) {
  
  const filter=e.target.value;
  
  data = data.filter(d => d.industry===filter);
  
  console.log(filter)
  console.log(data)
  
  for (let el of data) {
  
  blogArea.innerHTML += `<div class="entry">
  <div class="title" style="color:#3852A7;"><h3>${el.title}</h3></div>
  <div class="divider" style="background-color:#D7DF23;height:0.25px;"></div>
  <div class="entry_details">
    <h4>${el.industry} </h4>
  <b>${el.updatedAt}</b>
    <b>${el.country},${el.region}</b>
    <b>${el.topic}</b>
  <p>${el.content}</p></div>
  </div>`
  }
  
}


industryPicker.addEventListener('change',updateValue);



