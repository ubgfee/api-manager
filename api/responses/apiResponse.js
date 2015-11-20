/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 2015/7/24
 * Time: 9:42
 */

module.exports = function sendDATA (err, data, message, statusCode) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;
  var responseJSON = {
    isSuccess: err ? false : true,
    data: data || '',
    message: message || '',
    statusCode: statusCode || '',
    errorMessage: err
  };

  sails.log.silly('Api called:: Sending 200 ("OK") response');

  // Set status code
  res.status(200);

  return res.json(responseJSON);

};