/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 2015/7/27
 * Time: 16:30
 */

var util = require('util');
var BaseService = require('./BaseService');
var baseService = new BaseService();

function ApiService(){
  BaseService.call(this);
}

util.inherits(BaseService, ApiService);

ApiService.prototype = {

  add: function(options, cb){
    if(!options || typeof options != 'object'){
      cb && cb(true, '参数不正确');
      return;
    }
    if(!options.name){
      cb && cb(true, '接口名不能为空');
      return;
    }
    Apis.create(options).exec(function(err, data){
      cb && cb(err);
    });
  },

  edit: function(options, cb){
    Apis.update({id: options.id}, options).exec(function(err){
      cb && cb(err);
    });
  },
  
  list: baseService.list('apis'),

  info: function(id, cb){
    Apis.find({id: id}, function(err, data){
      cb && cb(err, data);
    });
  },

  del: function(id, cb){
    Apis.destroy({id: id}, function(err){
      cb && cb(err);
    });
  }

};

exports = module.exports = ApiService;