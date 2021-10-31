var async = require('async');  

var blogEntries = [];

class BlogEntry {
  constructor(title, updatedAt, country, region, industry, topic, content) {
    this.title = {};
    this.title.S = title;
    this.dt = {}; 
    this.dt.N = new Date(updatedAt).getTime().toString();
    this.updatedAt = {}; 
    this.updatedAt.S = new Date(updatedAt).toDateString();
    this.country = {};
    this.country.S = country;
    this.region = {};
    this.region.S = region;
    this.industry = {};
    this.industry.S = industry; 
    this.topic = {};
    this.topic.SS = topic; 
    this.Year = {};
    this.Year.N = new Date(updatedAt).getFullYear().toString();
    this.content = {};
    this.content.S = content;
  
  }
}

blogEntries.push(new BlogEntry('Moncler acquires Stone Island','Dec 7, 2020','Italy', 'Europe', "luxury",["outerwear"],'Moncler announced that it will acquire Italian fashion label Stone Island for $1.4 billion. Bloomberg reported that the Milan-headquartered luxury outerwear company will \“purchase 70 percent of Stone Island\’s parent company SPW from Chief Executive Officer Carlo Rivetti and other members of his family, \[and\] then buy the remaining 30 percent from Singapore\’s state investor Temasek\” in furtherance of a two-step transaction.'));
blogEntries.push(new BlogEntry('VF Corp. acquires Supreme for $2.1 billion','Nov 9, 2020', 'United States', 'North America', "streetwear",["portfolio"],'Three years after Supreme sold off a reported 50 percent stake to private equity giant Carlyle Group, VF Corp revealed that it will pay $2.1 billion to buy popular streetwear brand. The deal – which was formally completed on December 28, 2020 – saw VF Corp. take full ownership of Supreme, with current Supreme investors Carlyle Group and New York-based private equity firm Goode Partners agreeing to sell their stakes in the New York-based brand.'));
blogEntries.push(new BlogEntry('Alibaba, Richemont invest $1.1 billion in Farfetch','Nov 5, 2020','China', 'Asia',"luxury",["marketplace", "Alibaba", "Richemont"],'Alibaba Group Holding and Richemont announced that they will invest $1.1 billion in online luxury fashion retailer Farfetch and its new marketplace in China. At the same time, Artemis – an investment vehicle tied to Gucci owner Kering – simultaneously announced that it would increase its stake in Farfetch with a $50 million injection of cash in exchange for Farfetch’s Class A ordinary shares.'));
blogEntries.push(new BlogEntry('LVMH and Tiffany & Co. agree to $15.8 billion merger','Oct 29, 2020','United States', 'North America', "luxury",["LVMH"],'LVMH Moët Hennessy Louis Vuitton and Tiffany & Co. managed to salvage their meger deal, with the French luxury goods conglomerate agreeing to pay a few dollars less per share to acquire the New York-based jewelry company. In a statement, the parties confirmed that LVMH will pay $131.5 per Tiffany share, down from the $135\/share price tag they initially agreed to in November 2019 before the onset of the COVID-19 pandemic.'));

console.log(blogEntries);

var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";



var dynamodb = new AWS.DynamoDB();

var params = {};

//write an async function to write blog content to DynamoDB
async.eachSeries(blogEntries, function(value, callback) {

params.Item = value; 
params.TableName = "dealblog";

dynamodb.putItem(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});

    setTimeout(callback, 1000); 
}); 
