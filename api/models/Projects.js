/**
* Projects.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var functions = sails.config['functions'];

module.exports = {

  attributes: {
    //项目名称
    name: {
      type: 'string',
      required: true,
      unique: true
    },
    //项目描述
    desc: {
      type: 'string'
    },
    //接口访问的host
    host: {
      type: 'string'
    },
    //参与项目成员
    member: {
      type: 'string'
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
    var projectId = criteria.where.id;
    Modules.destroy({projectId: projectId}).exec(function(err){
      console.log('已删除与Id为' + projectId + '项目关联的模块!');
    });
    Apis.destroy({projectId: projectId}).exec(function(err){
      console.log('已删除与Id为' + projectId + '项目关联的接口!');
    });
    cb && cb();
  },

  afterCreate: function(records, cb){
    functions.socket.notice('一个新的项目被创建了：{$msg}', records.name);
    cb && cb();
  },

  afterUpdate: function(records, cb){
    functions.socket.notice('项目：{$msg} 有更新！', records.name);
    //同步apis
    Apis.update({projectId: records.id}, {projectName: records.name, projectHost: records.host}).exec(function(err){
      //todo
    });
    //同步modules
    Modules.update({projectId: records.id}, {projectName: records.name}).exec(function(err){
      //todo
    });
    cb && cb();
  }

};