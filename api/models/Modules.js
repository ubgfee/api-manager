/**
* Modules.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var functions = sails.config['functions'];

module.exports = {

  attributes: {
    //模块分组名称
    name: {
      type: "string",
      required: true,
      unique: true
    },
    //描述
    desc: {
      type: "string"
    },
    //模块名称（英文）
    controller: {
      type: "string",
      required: true,
      unique: true
    },
    //所属项目
    projectName: {
      type: "string"
    },
    //所属项目ID
    projectId: {
      type: "string"
    },
    //模块作者
    author: {
      type: "string"
    },
    //创建时间
    ctime: {
      type: 'string'
    }
  },

  beforeCreate: function(values, cb){
    values.ctime = new Date().toLocaleString();
    cb && cb();
  },

  beforeDestroy: function(criteria, cb){
    var moduleId = criteria.where.id;
    Apis.destroy({moduleId: moduleId}).exec(function(err){
      console.log('已删除与Id为' + moduleId + '模块关联的接口!');
    });
    cb && cb();
  },

  afterCreate: function(records, cb){
    functions.socket.notice('一个新的模块被创建了：{$msg}', records.name);
    cb && cb();
  },

  afterUpdate: function(records, cb){
    functions.socket.notice('模块：{$msg} 有更新！', records.name);
    //同步apis
    Apis.update({moduleId: records.id}, {moduleName: records.name, moduleController: records.controller}).exec(function(err){
      //todo
    });
    cb && cb();
  }

};