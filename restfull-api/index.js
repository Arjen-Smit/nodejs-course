/**
 * Primary file for API
 */

// Dependencies

const http = require('http');
const url = require('url');
const stringDecoder = require('string_decoder').StringDecoder;

const server = http.createServer((req, res) => {

    // Get the URL and parse it
    const parsedUrl = url.parse(req.url, true);

    // Get the path
    const path = parsedUrl.pathname;

    // const trimmePath = path.replace(/^\/+|\/+$/g, '');
    const trimmePath = path.replace(/\/+$/g, '');

    // Get the query string as an object.
    const queryStringObject = parsedUrl.query;

    // Get the HTTP Method
    const method = req.method.toUpperCase();

    // Get the headers as an object
    const headers = req.headers;

    // Get the payload, if any
    const decoder = new stringDecoder('utf-8');
    let buffer = '';

    req.on('data', (data) => {
        buffer += decoder.write(data);
    });

    req.on('end', () => {
        buffer += decoder.end();

        // Send response
        res.end('Hello World!\n');

        // Log the request path
        console.log(trimmePath, method, queryStringObject, headers, buffer);
    });
});

server.listen(3000, function() {
    console.log("The server is now listening on port 3000");
});