/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 2015/7/27
 * Time: 16:30
 */

var util = require('util');
var BaseService = require('./BaseService');
var baseService = new BaseService();

function ModulesService(){
  BaseService.call(this);
}

util.inherits(BaseService, ModulesService);

ModulesService.prototype = {

  add: function(options, cb){
    if(!options || typeof options != 'object'){
      cb && cb(true, '参数不正确');
      return;
    }
    if(!options.name){
      cb && cb(true, '模块名不能为空');
      return;
    }
    Modules.create(options).exec(function(err){
      cb && cb(err);
    });
  },

  update: function(options, cb){
    if(!options || typeof options != 'object'){
      cb && cb(true, '参数不正确');
      return;
    }
    if(!options.id){
      cb && cb(true, '模块id不能为空');
      return;
    }

    Modules.update({id: options.id}, options).exec(function(err, data){
      cb && cb(err, data);
    });
  },


  list: baseService.list('modules'),

  info: function(id, cb){
    Modules.find({id: id}, function(err, data){
      cb && cb(err, data);
    });
  },

  del: function(id, cb){
    Modules.destroy({id: id}, function(err){
      cb && cb(err);
    });
  }

};

exports = module.exports = ModulesService;
