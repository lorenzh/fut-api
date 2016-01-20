/*jslint node: true */
/* jshint strict: true */
"use strict";

module.exports = function(options){
  var utils = require("./lib/utils");
  var fs = require("fs");
  var defaultOptions = {
      saveCookie: false,
      saveCookiePath: null,
      loadCookieFromSavePath: false,
      cookieJarJson: null      
  };
  utils.mergeOptions(defaultOptions,options);
  var login = new (require("./lib/login"))(options);

  var loginResponse = {};

  var futApi = function(){
      if(defaultOptions.loadCookieFromSavePath)
      {
          try  {
            fs.accessSync(defaultOptions.saveCookiePath, fs.R_OK | fs.W_OK);
            var jsonString = fs.readFileSync(defaultOptions.saveCookiePath,"utf8");
            login.setCookieJarJSON(JSON.parse(jsonString));
          }
          catch(e){  }
      }
      else if(defaultOptions.cookieJarJson && typeof defaultOptions.cookieJarJson == "object")
      {
          var dcj = defaultOptions.cookieJarJson;
          if(dcj.version && dcj.storeType && dcj.rejectPublicSuffixes && dcj.cookies)
            login.setCookieJarJSON(dcj);
      }
  };
  
  futApi.prototype.getCookieJarJSON = function(){
    return login.getCookieJarJSON();
  };

  futApi.prototype.setCookieJarJSON = function(json){
      login.setCookieJarJSON(json);
  };

  futApi.prototype.login = function(email, password, secret, tfCodeCb, loginCb){
    login.login(email, password, secret, tfCodeCb, function(error, result){
      if(error)
        loginCb(error);
      else {
        loginResponse = result;
        
        if(defaultOptions.saveCookie && defaultOptions.saveCookiePath)
        {
            fs.writeFile(defaultOptions.saveCookiePath, 
                JSON.stringify(login.getCookieJarJSON()), 
                "utf8", 
                function(saveError){if(saveError) throw saveError;});
        }
        
        loginCb(null, result);        
      }
    });
  };

  return new futApi();
};
