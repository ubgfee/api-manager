/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 2015/7/28
 * Time: 16:13
 */

var BaseService = require('../services/BaseService');
var baseService = new BaseService();
var ProjectsService = require('../services/ProjectsService');
var projectsService = new ProjectsService();
var functions = sails.config['functions'];
var _util = functions['util'];
var json2csv = require('json2csv');

module.exports = {

  index: function (req, res) {
    baseService.list('projects')({}, function(err, data){
      return res.guessView({
        number: data.length || 0,
        list: data || [],
        layout: 'prj_layout'
      });
    });
  },

  info: function (req, res) {
    var id = req.param('id');
    if(functions.util.isEmpty(id)){
      return res.notFound('项目id为空');
    }

    projectsService.info(id, function(err, data){
      if(data.length == 0){
        return res.notFound('未找到该项目');
      }
      return res.view('project/add', {
        info: err ? {} : data && data[0]
      });
    });
  },

  add: function(req, res){
    res.guessView({
      layout: 'prj_layout'
    });
  },

  manage: function(req, res){
    var id = req.param('pid');
    if(functions.util.isEmpty(id)){
      return res.notFound('项目id为空');
    }

    projectsService.info(id, function(err, data){
      if(data.length == 0){
        return res.notFound('未找到该项目');
      }
      return res.guessView({
        info: err ? {} : data && data[0]
      });
    });
  },

  exportExcel: function(req, res){
    var pid = req.param('pid');
    var fields = ['projectName','projectHost','moduleName','moduleController','name', 'action', 'desc','ctime','params','remark'];
    if(_util.isEmpty(pid)){
      return res.notFound('项目id为空');
    }

    Apis.find({where: {projectId: pid}}).exec(function(err, data){
      if(err){
        return res.notFound(err.detail);
      }

      if(data.length == 0){
        return res.notFound('该项目暂无api文档');
      }

      data.forEach(function(item, i){
        var params = '';
        item.params.forEach(function(param){
          params+=param.paramDesc+':'+param.paramName+';';
        })
        item.params = params;
      })

      json2csv({ data: data, fields: fields }, function(err, csv) {
        if (err) return res.notFound('csv解析出错');

        res.setHeader('Content-Description', 'File Transfer');
        res.setHeader('Content-Type', 'application/csv; charset=utf-8');
        res.setHeader('Content-Disposition', 'attachment; filename=' + encodeURI(data[0].projectName) +'-api.csv');
        res.setHeader('Expires', '0');
        res.setHeader('Cache-Control', 'must-revalidate');
        res.send('\uFEFF' + csv);
        //
        //res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        //res.setHeader("Content-Disposition", "attachment; filename=" + data[0].projectName + "-api.csv");
        //res.end(csv, 'binary');
      });
    })

  }

};
