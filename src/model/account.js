var db = require('./index').db;

/**
 * @param {Object} account 
 * @param {String} account.name
 * @param {String} account.password
 * @returns {Promise}
 */
var addAccount = function (account) {
    return db().collection('account').insertOne(account);
};

/**
 * @param {Object} query 
 * @param {String} query.name
 * @returns {Promise}
 */
var getAccount = function (query) {
    return db().collection('account').findOne(query);
};

module.exports = {
    addAccount: addAccount,
    getAccount: getAccount
};
