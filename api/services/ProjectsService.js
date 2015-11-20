/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 2015/7/27
 * Time: 16:30
 */

var util = require('util');
var BaseService = require('./BaseService');
var baseService = new BaseService();

function ProjectsService(){
  BaseService.call(this);
}

util.inherits(BaseService, ProjectsService);

ProjectsService.prototype = {

  add: function(options, cb){
    if(!options || typeof options != 'object'){
      cb && cb(true, '参数不正确');
      return;
    }
    if(!options.name){
      cb && cb(true, '项目名不能为空');
      return;
    }
    Projects.create(options).exec(function(err, data){
      cb && cb(err, data);
    });
  },

  update: function(options, cb){
    if(!options || typeof options != 'object'){
      cb && cb(true, '参数不正确');
      return;
    }
    if(!options.id){
      cb && cb(true, '项目id不能为空');
      return;
    }

    //var id = options.id;
    Projects.update({id: options.id}, options).exec(function(err, data){
      cb && cb(err, data);
    });
  },

  list: baseService.list('projects'),

  info: function(id, cb){
    Projects.find({id: id}, function(err, data){
      cb && cb(err, data);
    });
  },

  del: function(id, cb){
    Projects.destroy({id: id}, function(err){
      cb && cb(err);
    });
  },



};

exports = module.exports = ProjectsService;
