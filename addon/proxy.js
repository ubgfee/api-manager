/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 2015/8/5
 * Time: 17:03
 */

var http = require('http');
var https = require('https');
var url = require('url');
var qs = require('qs');
var useProtocol = {
  "http:": http,
  "https:": https
};

module.exports = {

  request: function(req, res, callback){
    var urlParseResult = url.parse(req.body.apiUrl);
    var params = req.body.params || '';
    var search = req.body.paramsArr || '';
    var reqOptions = {
      host: urlParseResult.host,
      port: urlParseResult.port || 80,
      method: req.body.method || 'GET',
      path: urlParseResult.pathname + '?' + search,
      headers: req.headers,
      rejectUnauthorized: false
    };
    var reqData = qs.stringify(params);
    reqOptions['headers']['content-length'] = reqData.length;
    reqOptions['headers']['accept-encoding'] = 'deflate';
    var body = '';
    var request = useProtocol[urlParseResult.protocol].request(reqOptions, function(response){
      response.on('data',function(d){
        body += d;
      }).on('end', function(){
        callback(response, null, body);
      }).on('error', function(err){
        callback(response, err, '');
      });
    });
    request.write(reqData);
    request.end();
  }

};