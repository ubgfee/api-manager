/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 2015/7/27
 * Time: 16:28
 */

var util = require('util');
var BaseService = require('./BaseService');
var baseService = new BaseService();

function UserService(){
  BaseService.call(this);
}

util.inherits(BaseService, UserService);

UserService.prototype = {

  add: function(options, cb){
    if(!options || typeof options != 'object'){
      cb && cb(true, '参数不正确');
      return;
    }
    if(!options.username){
      cb && cb(true, '用户名不能为空');
      return;
    }

    if(!options.password){
      cb && cb(true, '密码不能为空');
      return;
    }
    User.create(options).exec(function(err){
      cb && cb(err);
    });
  },

  list: baseService.list('user')
};

exports = module.exports = UserService;