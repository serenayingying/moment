var session = require('../util/session');

var sessionParser = function (req, res, next) {
    var token = req.cookies['usid'];
    req.session = session.getSession(token);
    next();
};

module.exports = sessionParser;
