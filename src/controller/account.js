var accountModel = require('../model/account');
var session = require('../util/session');

var register = function (req, res) {
    // 接收参数
    var name = req.body.name;
    var password = req.body.password;
    // 创建用户
    accountModel
        .addAccount({ name: name, password: password })
        .then(function () {
            // 成功,成功登录

            // 设置 cookie
            var token = session.generateToken();
            res.cookie('usid', token);

            // 设置 session
            session.setSession(token, { name: name });

            res.json({ success: true });
        })
        .catch(function (err) {
            // 失败,错误提示
            res.json({ success: false, error: err.message });
        });
};

var login = function (req, res) {
    // 接收参数
    var name = req.body.name;
    var password = req.body.password;

    // 查询用户
    accountModel
        .getAccount({ name: name })
        .then(function (account) {
            // 校验用户
            if (!account) {
                return res.json({ success: false, error: 'user not exists' });
            }
            if (account.password !== password) {
                return res.json({ success: false, error: 'user name and password does not match' });
            }

            // 登录成功

            // 设置 cookie
            var token = session.generateToken();
            res.cookie('usid', token);

            // 设置 session
            session.setSession(token, { name: name });

            res.json({ success: true, data: { name: name } });
        });
};

var loginSession = function (req, res) {
    if (req.session) {
        res.send({ success: true, account: req.session });
    } else {
        res.send({ success: false });
    }
};

module.exports = {
    register: register,
    login: login,
    loginSession: loginSession
}
