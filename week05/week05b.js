//npm install aws-sdk
// var async = require('async');

var blogEntries = [];

class BlogEntry {
  constructor(id, lastUpdated, title, entity, country, industry, topic, content) {
    this.pk = {}; //create an object `pk`
    this.pk.S = title+'-'+lastUpdated
    this.id = {};
    this.id.S = id.toString();
    this.lastUpdated = {}; 
    this.lastUpdated.S = new Date(lastUpdated).toDateString();
    this.title = {};
    this.title.S = title;
    this.entity = [];
    this.entity.S = entity;
    this.country = {};
    this.country.S = country;
    this.industry = [];
    this.industry.S = industry;
    this.topic = [];
    this.topic.S = topic;
    this.dealYear = {};
    this.dealYear.N = new Date(lastUpdated).getYear().toString();
    this.content = {};
    this.content.S = content;
  
  }
}

blogEntries.push(new BlogEntry(1, 'September 28 2021', "G-III to Acquire Sonia Rykiel","Sonia Rykiel","United States", "apparel","defunct",'G-III Apparel Group revealed that it has entered into an agreement to purchase Sonia Rykiel, with plans to accelerate the relaunch of the French fashion brand primarily in Europe, for the fall of 2022, with collections across multiple categories. The transaction, which comes less than two years after brothers Eric and Michael Dayan successfully bid to acquire all of the bankrupt brand’s assets via a court-administered process. (Those assets included the brand’s intellectual property rights (namely, its various global trademark registrations, and decades of archives and product prototypes); the commercial leases for its brick-and-mortar outposts in France – from its Saint Germain flagship to a glitzy boutique in Cannes, among others; and its remaining stock of garments and accessories.) The deal is expected to close by the end of October 2021.'));
blogEntries.push(new BlogEntry(2, 'Auguest 24, 2021', "Chanel Takes Majority Stake in Paima", ["CHANEL","Paima"],"France", ["apparel","luxury"],["supply chain","knitwear"],'Chanel has taken a majority stake in Italian knitwear company Paima, a move that falls in line with a larger pattern of luxury giants looking gain greater control over their supply chains by bringing key third-party companies under their own roofs. “This decision has been motivated by converging interests,” Chanel asserted in a statement, noting that while Paima, which has been a supplier for the French fashion brand for 25 years, “has seen its development accelerate in recent years, it seemed appropriate to have a solid partner to help it grow [further] and invest.” More than that, Chanel revealed that the investment “provides a more sustainable collaboration framework by continuing an already established relationship.”'));
blogEntries.push(new BlogEntry(3, 'Auguest 12, 2021', "Authentic Brands Group Buys Reebok", ["adidas","Authentic Brands Group","Reebok"],"Germany", ["footwear"],["portfolio"],'Adidas is selling its Reebok brand to Authentic Brands Groups for up to 2.1 billion euros ($2.46 billion), with the German sporting wear group looking to “focus on its core brand after the U.S. fitness label failed to live up to expectations,” per Reuters. Authentic Brand, which filed its preliminary IPO documentation in July, has been on a buying streak in the past few years, with the brand developer buying up an array of fashion and apparel companies, ranging from Juicy Couture and Judith Leiber to Jones New York, Volcom, and Aeropostale.'));

// console.log(blogEntries);

var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";



var dynamodb = new AWS.DynamoDB();

var params = {};
params.Item = blogEntries[0]; 
params.TableName = "processblog";

dynamodb.putItem(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});