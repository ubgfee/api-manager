/**
 * Created by xuxin on 15/8/5.
 */
module.exports = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  else{
    if (req.wantsJSON) {
      return res['apiResponse'](new Error(''), null, '请登录');
    }else{
      return res.redirect('/login');
    }
  }
};
