var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/moment';
var dbConnection = null;

var init = function () {
    return MongoClient
        .connect(url)
        .then(function (connectResult) {
            dbConnection = connectResult;     
        })
        .catch(function (err) {
            console.log(err.message);
            throw err;
        });
};

var db = function () {
    return dbConnection;
}

module.exports = {
    init: init,
    db: db
};
