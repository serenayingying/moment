var cnt = 0;
var generateToken = function () {
    return 'usid_' + cnt++;
};

var session = {};
var getSession = function (token) {
    return session[token];
};

var setSession = function (token, data) {
    session[token] = data;
}

module.exports = {
    generateToken: generateToken,
    getSession: getSession,
    setSession: setSession
}
