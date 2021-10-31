/*global d3 */

// npm install aws-sdk



var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "dealblog",
    KeyConditionExpression: "industry = :industryName and dt between :minDate and :maxDate",// the query expression
    // KeyConditionExpression: "#tp = :topicName and dt between :minDate and :maxDate", 
    // ExpressionAttributeNames: {  // name substitution, used for reserved words in DynamoDB
    //     "#tp" : "topic"
    // },
    //Learnings: for reserved names, create a name substitution that starts with `#`. If `topic` is not a reserved name, you don't need a name substitution. 
    ExpressionAttributeValues: { // the query values
        ":industryName": {S:"apparel"},
        ":minDate": {N: new Date("July 11, 2021").valueOf().toString()},
        ":maxDate": {N: new Date("September 28, 2021").valueOf().toString()}
    }
};

dynamodb.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log("***** ***** ***** ***** ***** \n", item);
        });
    }
});

