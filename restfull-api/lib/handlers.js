
const userHandlers = require('./handlers/users');


const handlers = {};


handlers.users = (data, callback) => {
    const acceptableMethods = ['POST', 'GET', 'PUT', 'DELETE'];
    if (acceptableMethods.indexOf(data.method) !== -1) {
        handlers._users[data.method](data, callback);
    } else {
        callback(405);
    }
};

handlers._users = userHandlers;


handlers.ping = (data, callback) => {

    callback(200);
};

handlers.notFound = (data, callback) => {

    callback(404);
};

module.exports = handlers;