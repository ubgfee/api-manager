/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 2015/7/22
 * Time: 11:36
 */

var _util = sails.config['functions']['util'];
var BaseService = require('../services/BaseService');
var UserService = require('../services/UserService');
var ProjectsService = require('../services/ProjectsService');
var ModulesService = require('../services/ModulesService');
var ApiService = require('../services/ApiService');
var baseService = new BaseService();
var userService = new UserService();
var projectsService = new ProjectsService();
var modulesService = new ModulesService();
var apiService = new ApiService();

module.exports = {
  addUser: function(req, res){
    var options = req.body;
    userService.add(options, function(err, message){
      var _message = message ? message : err ? '添加用户失败！' : '添加用户成功！';
      res['apiResponse'](err, null, _message);
    });
  },

  addProject: function(req, res){
    var options = req.body;
    projectsService.add(options, function(err, data, message){
      var _message = message ? message : err ? '添加项目失败！' : '添加项目成功！';
      res['apiResponse'](err, data, _message);
    });
  },

  updateProject: function(req, res){
    var options = req.body;
    projectsService.update(options, function(err, data, message){
      var _message = message ? message : err ? '添加项目失败！' : '修改项目成功！';
      res['apiResponse'](err, data, _message);
    });
  },


  delProject: function(req, res){
    var pid = req.param('id');
    projectsService.del(pid, function(err, message){
      var _message = message ? message : err ? '删除失败！' : '删除成功！';
      res['apiResponse'](err, null, _message);
    });
  },

  addModule: function(req, res){
    var options = req.body;
    modulesService.add(options, function(err, message){
      var _message = message ? message : err ? '添加模块失败！' : '添加模块成功！';
      res['apiResponse'](err, null, _message);
    });
  },

  updateModule: function(req, res){
    var options = req.body;
    modulesService.update(options, function(err, data, message){
      var _message = message ? message : err ? '添加模块失败！' : '修改模块成功！';
      res['apiResponse'](err, data, _message);
    });
  },


  delModule: function(req, res){
    var mid = req.param('id');
    modulesService.del(mid, function(err, message){
      var _message = message ? message : err ? '删除失败！' : '删除成功！';
      res['apiResponse'](err, null, _message);
    });
  },

  addApi: function(req, res){
    var options = req.body;
    if(options['paramName']){
      var multiParams = _util.parserMultiParams(options['paramName'].length, {
        paramName: options['paramName'],
        paramType: options['paramType'],
        paramRequired: options['paramRequired'],
        paramDesc: options['paramDesc']
      });
      options.params = multiParams;
    }
    apiService.add(options, function(err, message){
      var _message = message ? message : err ? '添加api失败！' : '添加api成功！';
      res['apiResponse'](err, null, _message);
    });
  },

  editApi: function(req, res){
    var options = req.body;
    if(options['paramName']){
      var multiParams = _util.parserMultiParams(options['paramName'].length, {
        paramName: options['paramName'],
        paramType: options['paramType'],
        paramRequired: options['paramRequired'],
        paramDesc: options['paramDesc']
      });
      options.params = multiParams;
    }
    apiService.edit(options, function(err, message){
      var _message = message ? message : err ? '修改api失败！' : '修改api成功！';
      res['apiResponse'](err, null, _message);
    });
  },

  delApi: function(req, res){
    var aid = req.param('id');
    apiService.del(aid, function(err, message){
      var _message = message ? message : err ? '删除失败！' : '删除成功！';
      res['apiResponse'](err, null, _message);
    });
  },

  list: function(req, res){
    var listType = req.param('type');
    var ServiceFn = baseService.list(listType);
    ServiceFn({}, function(err, data){
      res['apiResponse'](err, data);
    });
  }

};
