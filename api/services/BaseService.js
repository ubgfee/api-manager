/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 2015/7/26
 * Time: 20:58
 */

var functions = sails.config['functions'];

function BaseService(){

  this._name_ = 'UBG-API service';

  this.list = function(modelName){
    return function(options, cb){
      functions.model.list.call(sails.models[modelName], options, cb);
    };
  };

}

//原型上的方法不会被继承？？？
/*BaseService.prototype = {

  list: function(modelName){
    return function(options, cb){
      functions.model.list.call(sails.models[modelName], options, cb);
    };
  }

};*/

exports = module.exports = BaseService;