/**
* Api.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var functions = sails.config['functions'];

module.exports = {

  attributes: {
    //接口名称
    name: {
      type: "string",
      required: true
    },
    //接口名称（英文）
    action: {
      type: "string",
      required: true
    },
    //接口描述
    desc: {
      type: "string"
    },
    //所属项目ID
    projectId: {
      type: "string",
      required: true
    },
    //所属项目名称
    projectName: {
      type: "string",
      required: true
    },
    //所属项目host
    projectHost: {
      type: "string",
      required: true
    },
    //所属模块的ID
    moduleId: {
      type: "string",
      required: true
    },
    //所属模块的名称
    moduleName: {
      type: "string",
      required: true
    },
    //所属模块的名称(英文)
    moduleController: {
      type: "string",
      required: true
    },
    isLoginApi: {
      type: "string",
      defaultsTo: '0'
    },
    //请求方式
    method: {
      type: "string",
      defaultsTo: 'get',
      enum: ['get', 'post', 'put', 'delete']
    },
    //指定url(优先级大于defaultUrl)
    url: {
      type: "string"
    },
    //请求参数
    params: {
      type: "array",
      defaultsTo: []
    },
    //返回对象
    returns: {
      type: "string",
      required: true
    },
    //备注信息
    remark: {
      type: "text"
    },
    //创建时间
    ctime: {
      type: 'string'
    },
    //更新时间
    mtime: {
      type: 'string'
    }
  },

  beforeCreate: function(values, cb){
    var createTime = new Date().toLocaleString();
    values.ctime = createTime;
    values.mtime = createTime;
    for(var key in values){
      if(values.hasOwnProperty(key)){
        if(!this.definition[key]){
          delete values[key];
        }
      }
    }
    cb && cb();
  },

  beforeUpdate: function(values, cb){
    values.mtime = new Date().toLocaleString();
    cb && cb();
  },

  afterCreate: function(records, cb){
    functions.socket.notice('一个新的Api被创建了：{$msg}', records.name);
    cb && cb();
  },

  afterUpdate: function(records, cb){
    functions.socket.notice('Api：{$msg} 有更新！', records.name);
    cb && cb();
  }

};