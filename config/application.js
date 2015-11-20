/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 2015/7/24
 * Time: 14:39
 * 项目全局配置，可以通过 sails.config[key] 来访问该配置
 */

var functions = require('../addon/functions');

module.exports = {

  port: 1337,

  appName: "UBG API 项目",

  functions: functions

};