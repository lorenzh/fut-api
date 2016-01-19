/*jslint node: true */
/* jshint strict: true */
"use strict";

module.exports = function(apiOptions){
  var login = new (require("./lib/login"))(apiOptions);

  var loginResponse = {};

  var futApi = function(){};

  futApi.prototype.login = function(email, password, secret, tfCodeCb, loginCb){
    login.login(email, password, secret, tfCodeCb, function(error, result){
      if(error)
        loginCb(error);
      else {
        loginResponse = result;
        loginCb(null, result);
      }
    });
  };


  return new futApi();
};
