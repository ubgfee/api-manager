var passport = require('passport');
var UserService = require('../services/UserService');
var userService = new UserService();

module.exports = {

  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },

  login: function(req, res) {

    passport.authenticate('local', function(err, user, info) {
      if ((err) || (!user)) {
        return res.notFound(info.message);
      }
      req.logIn(user, function(err) {
        if (err) res.send(err);
        return res.redirect('/');
      });

    })(req, res);
  },

  logout: function(req, res) {
    req.logout();
    res.redirect('/');
  },

  signup: function(req, res) {
    var options = req.body;

    userService.add(options, function (err, message) {
      var _message = message ? message : err ? '注册失败！' : '注册成功，请登入';
      res['apiResponse'](err, null, _message);
    })
  }


};
