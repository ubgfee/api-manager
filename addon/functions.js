/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 2015/7/24
 * Time: 17:33
 */

module.exports = {

  socket: {
    notice: function(txt, msg){
      sails.sockets.blast('notice', {
        message: txt.replace(/\{\$msg\}/, '<strong style="color: darkblue">' + msg + '</strong>')
      });
    }
  },

  model: {
    list: function(options, cb){
      this.find(options).exec(function(err, data){
        cb && cb(err, data);
      });
    }
  },


  util: {
    isEmpty: function(obj){
      if (!obj) return true;

      // 判断是不是本地属性
      var hasOwnProperty = Object.prototype.hasOwnProperty;

      // 字符串 / 类数组
      if (obj.length > 0)    return false;
      if (obj.length === 0)  return true;

      // {}
      for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false; // 是本地属性则不为空
      }

      return true;
    },

    trim: function(val){
      return val.replace(/(^\s*)|(\s*$)/g,'');
    },

    parserMultiParams: function(len, object){
      var data = [];
      var item;
      for(var j = 0; j < len; j++){
        var obj = {};
        for(var key in object){
          if(object.hasOwnProperty(key)){
            item = object[key][j];
            //if(!this.trim(item))return false;
            obj[key] = item;
          }
        }
        data.push(obj);
      }
      return data;
    },

    deepCopy: function(o){
      var ret = {};
      Object.keys(o).forEach(function (val) {
        ret[val] = o[val];
      });
      return ret;
    }
  }

};
