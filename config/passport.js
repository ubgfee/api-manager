/**
 * Created by xuxin on 15/8/5.
 */
var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;
  //bcrypt = require('bcrypt');

var crypto = require('crypto');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({ id: id } , function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, done) {

    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: '用户名或密码错误' });
      }

      var md5 = crypto.createHash('md5');
      var password_md5 = md5.update(password).digest("hex");

      if(password_md5 === user.password){
        var returnUser = {
          username: user.username,
          createdAt: user.createdAt,
          id: user.id
        };
        return done(null, returnUser, {
          message: '登录成功'
        });
      }else{
        return done(null, false, {
          message: '用户名或密码错误'
        });
      }

      //bcrypt.compare(password, user.password, function (err, res) {
      //  if (!res)
      //    return done(null, false, {
      //      message: '用户名或密码错误'
      //    });
      //  var returnUser = {
      //    username: user.username,
      //    createdAt: user.createdAt,
      //    id: user.id
      //  };
      //  return done(null, returnUser, {
      //    message: '登录成功'
      //  });
      //});
    });
  }
));
