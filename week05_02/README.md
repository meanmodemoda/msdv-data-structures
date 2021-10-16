### Summary
Set up a NoSQL database via Amazon DynamoDB. Write data into the database.
##
### Assignment Details
- Set up Amazon DynamoDB. For access security, use IAM to assign access roles across AWS services vs using access key.
- Create a  `dealblog` table and determine the `primary key`, which is the only key that can be queried on besides the optional `sorting key`.
- Write data into the database using `async`.  

##
### Process
###
**Step 1**: Refine schema design

I decided to trim down the database content so I could spend less time on data entry and more time on coding for the front-end. 
###
<img src="./nosql_diagram_v3.png" width="500" alt="schema design diagram">
###
Based on the updated schema, I created a `dealblog` DynamoDB table. I chose to use `title` as my `primary key` and a numeric time number `dt` converted from the `updatedAt` day value as the `sorting key`. A note to myself is even `dt` is a number type, I still need to stringfy it for writing into database.
###

```javascript
 this.dt = {}; 
 this.dt.N = new Date(updatedAt).getTime().toString();
```

**Step 2**: Create a class for populating blog entries 

I followed the starter code to create 3 sample blog entries and console.log them to check the output.

**Step 3**: Write blog entries into DynamoDB

I created an `async` callback function referencing previous assignmentss to write all blog entries into the `dealblog` table. The blog entries were successfully written into the database.

<img src="./DynamoDB_return.png" width="800" alt="DynamoDB returns">

### Reflections
###
Thanks to this exercise that prompted me to reflect on my SQL project - which I should have used a class to create my tables where I can set up proper data types directly. 

