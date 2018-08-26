/*
 * Library for storing and editing data, should be extended with some usefull helpers and made DRY after that.
 */



// Dependencies
const fs = require('fs');
const path = require('path');
const util = require('./helpers');

const lib = {};

lib.baseDir = path.join(__dirname, '/../.data/');

lib.create = (dir, file, data, callback) => {
    fs.open(lib.baseDir + dir + '/' + file + '.json', 'wx', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            const stringData = JSON.stringify(data, null, 4);
            fs.writeFile(fileDescriptor, stringData, (err) => {
                if (!err) {
                    fs.close(fileDescriptor, (err) => {
                        if(!err) {
                            callback(false);
                        } else {
                            callback("Error closing new file.")
                        }
                    });
                } else {
                    callback('Error writing to new file');
                }
            });
        }
        else {
            callback('Could not create new file, it may alread exist.');
        }
    });
};

lib.read = (dir, file, callback) => {
    fs.readFile(lib.baseDir + dir + '/' + file + '.json', 'utf8', (err,data) => {
        if (!err) {
            callback(false, util.parseJsonToObject(data));
        } else {
            callback(err,data);
        }
    });
};

lib.update = (dir, file, data, callback) => {
    fs.open(lib.baseDir + dir + '/' + file + '.json', 'r+', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            const stringData = JSON.stringify(data, null, 4);

            fs.truncate(fileDescriptor, (err) => {
                if(!err) {
                    fs.writeFile(fileDescriptor, stringData, (err) => {
                        if(!err) {
                            fs.close(fileDescriptor, (err) => {
                                if(!err) {
                                    callback(false);
                                } else {
                                    callback("Error updated file.")
                                }
                            });
                        } else {
                            callback('Error writing to existing file');
                        }
                    });
                } else {
                    callback('Error truncating file');
                }
            });
        } else {
            callback('Could not open file for editing, it may not exist');
        }

    });
};

lib.delete = (dir, file, callback) => {
  fs.unlink(lib.baseDir + dir + '/' + file + '.json', (err) => {
      if(!err) {
          callback(false);
      } else {
          callback("File could not be deleted it might not exist");
      }
  });
};


module.exports = lib;