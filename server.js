//this is to create a simple http server, responding to "hello world"
//using node.js as a server

const http = require('http');

const hostname = process.env.IP;
const port = process.env.PORT;

//environment variables

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    res.end('<h1>Hello World</h1><p>Welcome to Data Structures</p>');
});
//control c in terminal to stop server from running first
//restart using node server.js
//in terminal use up key, it repeats
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
