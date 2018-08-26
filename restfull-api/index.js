/**
 * Primary file for API
 */

// Dependencies

const http = require('http');
const https = require('https');
const url = require('url');
const stringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');
const fs = require('fs');
const handlers = require('./lib/handlers');
const helpers = require('./lib/helpers');

console.log("starting application in " + config.envName);

// Instantiate HTTP Server
const HttpServer = http.createServer((req, res) => {
    unifiedServer(req, res);
});

HttpServer.listen(config.port.http, function() {
    console.log("The server is now listening on port " + config.port.http);
});

// Instantiate HTTPS Server
const httpsServerOptions = {
    key: fs.readFileSync('./https/key.pem'),
    cert: fs.readFileSync('./https/cert.pem'),
};

const HttpsServer = https.createServer(httpsServerOptions, (req, res) => {
    unifiedServer(req, res);
});

HttpsServer.listen(config.port.https, function() {
    console.log("The server is now listening on port " + config.port.https);
});


const unifiedServer = (req, res) => {
    // Get the URL and parse it
    const parsedUrl = url.parse(req.url, true);

    // Get the path
    const path = parsedUrl.pathname;

    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

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

        // Choose the selecterd handler, if not found use the notFound handler
        const chosenHandler = router.hasOwnProperty(trimmedPath) ? router[trimmedPath] : handlers.notFound;

        const data = {
            trimmedPath: trimmedPath,
            queryStringObject: queryStringObject,
            method: method,
            headers: headers,
            payload: helpers.parseJsonToObject(buffer),
        };

        chosenHandler(data, (statusCode, payload) => {
            // Define the statusCode as set by the callback, or default to 200.
            statusCode = typeof(statusCode) === 'number' ? statusCode : 200;

            // Use the payload as set by the callback, or default to an empty object.
            payload = typeof(payload) === 'object' ? payload : {};

            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(JSON.stringify(payload));

            console.log('returning response: ', statusCode, payload);
        });
    });
}

const router = {
    'ping' : handlers.ping,
    'users' : handlers.users,
};
