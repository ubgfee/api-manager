/**
 * ApiController
 *
 * @description :: Server-side logic for managing apis
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var proxy = require('../../addon/proxy');
var BaseService = require('../services/BaseService');
var ProjectsService = require('../services/ProjectsService');
var ModulesService = require('../services/ModulesService');
var ApiService = require('../services/ApiService');
var baseService = new BaseService();
var projectsService = new ProjectsService();
var modulesService = new ModulesService();
var apiService = new ApiService();
var functions = sails.config['functions'];
var _util = sails.config['functions']['util'];

module.exports = {

  index: function (req, res) {
    var pid = req.param('pid');
    if(_util.isEmpty(pid)){
      return res.notFound('项目id为空');
    }

    Apis.find({where: {projectId: pid}}).sort('ctime ASC').exec(function(err, data){
      if(err){
        return res.notFound(err.detail);
      }

      var alist = {};
      data.forEach(function(item){
        if(!alist[item.moduleName]){
          alist[item.moduleName] = [];
          alist[item.moduleName].push(_util.deepCopy(item));
        }else{
          alist[item.moduleName].push(_util.deepCopy(item));
        }
      })

      return res.guessView({
        info: {
          id: pid,
          list: alist
        }
      });
    })
  },

  add: function(req, res){
    var pid = req.param('pid');

    if(_util.isEmpty(pid)){
      return res.notFound('项目id为空');
    }

    projectsService.info(pid, function (err, data) {
      baseService.list('modules')({projectId: pid}, function(err, moduleList){
        return res.guessView({
          info: err ? {} : data && data[0],
          moduleList: moduleList || [],
          isNew: true
        });
      });
    });
  },

  edit: function(req, res){
    var aid = req.param('aid');
    if(_util.isEmpty(aid)){
      return res.notFound('请指定api的id');
    }
    apiService.info(aid, function(err, data){
      var pid = data && data[0]['projectId'];
        baseService.list('modules')({projectId: pid}, function(err, moduleList){
          return res.view('api/add', {
            info: err ? {} : data && data[0],
            moduleList: moduleList || [],
            isNew: false
        });
      });
    });
  },

  copy: function(req, res){
    var aid = req.param('aid');
    if(_util.isEmpty(aid)){
      return res.notFound('请指定api的id');
    }
    apiService.info(aid, function(err, data){
      var pid = data && data[0]['projectId'];
      baseService.list('modules')({projectId: pid}, function(err, moduleList){
        return res.view('api/add', {
          info: err ? {} : data && data[0],
          moduleList: moduleList || [],
          isNew: false
        });
      });
    });
  },

  info: function (req, res) {
    var id = req.param('id');
    apiService.info(id, function(err, data){
      return res.guessView({
        info: err ? {} : data && data[0]
      });
    });
  },

  test: function(req, res){
    var aid = req.param('aid');
    if(_util.isEmpty(aid)){
      return res.notFound('请指定要测试的api的id');
    }
    apiService.info(aid, function(err, data){
      var _d = data && data[0];
      var pid = _d['projectId'];
      var isCurrentLoginApi = _d['isLoginApi'] == '1';
      Apis.find({where: {projectId: pid, isLoginApi: '1'}}).exec(function(err, loginApi){
        if(err){
          return res.notFound(err.detail);
        }
        return res.guessView({
          info: err ? {} : _d,
          isCurrentLoginApi: isCurrentLoginApi,
          loginApiId: loginApi && loginApi[0]['id']
        });
      });
    });
  },

  doTest: function(req, res){
    proxy.request(req, res, function(response, err, data){
      res.set('Set-Cookie', response['headers']['set-cookie']);
      try {
        var json = JSON.parse(data);
        res.json({
          isSuccess: err ? false : true,
          message: err ? "接口调用出错" : "接口调用成功",
          data: err ? err : json
        });
      } catch (e) {
        res.json({
          isSuccess: false,
          message: "调用出错",
          data: data
        });
      }

    });
  }

};

function getApiList(res, pid, mid, project, module){
  var options = {};
  if(pid){
    options.projectId = pid;
  }
  if(mid){
    options.moduleId = mid;
  }
  baseService.list('apis')(options, function (err, data) {
    return res.guessView({
      info: {
        id: pid,
        projectName: project && project[0]['name'] || '',
        number: data.length || 0,
        list: data || []
      }
    });
  });
}
