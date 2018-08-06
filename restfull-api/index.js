/**
 * Primary file for API
 */

// Dependencies

const http = require('http');
const url = require('url');

const server = http.createServer(function(req, res){

    // Get the URL and parse it
    const parsedUrl = url.parse(req.url, true);

    // Get the path
    const path = parsedUrl.pathname;

    // const trimmePath = path.replace(/^\/+|\/+$/g, '');
    const trimmePath = path.replace(/\/+$/g, '');

    // Send respons
    res.end('Hello World!\n');

    // Log the request path
    console.log('Request received on path: ' + trimmePath);
});

server.listen(3000, function() {
    console.log("The server is now listening on port 3000");
});