/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 2015/7/29
 * Time: 10:10
 */

var BaseService = require('../services/BaseService');
var baseService = new BaseService();
var ProjectsService = require('../services/ProjectsService');
var projectsService = new ProjectsService();
var ModulesService = require('../services/ModulesService');
var modulesService = new ModulesService();
var functions = sails.config['functions'];

module.exports = {

  index: function (req, res) {
    var pid = req.param('pid');
    if(functions.util.isEmpty(pid)){
      return res.notFound('项目id为空');
    }

    projectsService.info(pid, function(err, project){
      baseService.list('modules')({projectId: pid}, function(err, data){
        return res.guessView({
          info:{
            id: pid,
            projectName: project && project[0]['name'],
            number: data.length || 0,
            list: data || []
          }
        });
      });
    });
  },

  add: function(req, res){
    var pid = req.param('pid');
    if(functions.util.isEmpty(pid)){
      return res.notFound('项目id为空');
    }
    projectsService.info(pid, function(err, data){
      return res.guessView({
        info: err ? {} : data && data[0],
        isNew: true
      });
    });
  },


  info: function (req, res) {
    var id = req.param('id');
    if(functions.util.isEmpty(id)){
      return res.notFound('模块id为空');
    }
    modulesService.info(id, function(err, data){
      return res.view('module/add', {
        info: err ? {} : data && data[0],
        isNew: false
      });
    });
  }

};
