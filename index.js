/*jslint node: true */
"use strict";

module.exports = function(options){
  var __ = require("underscore");
  var utils = require("./lib/utils");
  var urls = require("./lib/urls");
  var fs = require("fs");
  var defaultOptions = {
      saveCookie: false,
      saveCookiePath: null,
      loadCookieFromSavePath: false,
      cookieJarJson: null      
  };
  
  defaultOptions = __.extend(defaultOptions, options);
  
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
        loginCb(null, result); 
        
        if(defaultOptions.saveCookie && defaultOptions.saveCookiePath)
        {
            fs.writeFile(defaultOptions.saveCookiePath, 
                JSON.stringify(login.getCookieJarJSON()), 
                "utf8", 
                function(saveError){
                    if(saveError) throw saveError;
                           
                    });
        }
      }
    });
  };
  
  futApi.prototype.getCredits = function(cb){
      sendRequest(urls.api.credits, cb);
  };
  
  futApi.prototype.getTradepile = function(cb){
      sendRequest(urls.api.tradepile, cb);
  };
  
  futApi.prototype.getWatchlist = function(cb){
      sendRequest(urls.api.watchlist, cb);
  };
  
  futApi.prototype.getPilesize = function(cb){
      sendRequest(urls.api.pilesize, cb);
  };
  
  futApi.prototype.relist = function(cb){
      sendRequest(urls.api.relist,"PUT", cb);
  };
  
  futApi.prototype.search = function(filter,cb){
      var defaultFilter = {
          type: "player",
          start: 0,
          num: 16
      };
      
      defaultFilter = __.extend(defaultFilter, filter);
      
      sendRequest(urls.api.transfermarket + toUrlParameters(defaultFilter), cb);
  }
  
  function toUrlParameters(obj){
      var str = "";
      var keys = Object.keys(obj);
      for(var i = 0; i < keys.length;i++){
          str += keys[i] + "=" + encodeURI(obj[keys[i]]).replace(/%5B/g, '[').replace(/%5D/g, ']') + "&";
      }
      return str.substr(0, str.length - 1);
  }
  
  function sendRequest(url,xHttpMethod,cb){
      
      var validXHttpMethod = ["GET","PUT"];
      
      var xhttp = xHttpMethod || "GET" ;
      xhttp = validXHttpMethod.indexOf(xhttp) >= 0 ? xhttp : "GET";
            
      var rcb = cb || xHttpMethod;
      rcb = __.isFunction(rcb) ? rcb : function(e,r){};
      
      loginResponse.apiRequest.post(url,{
          headers: { "X-HTTP-Method-Override": xhttp }
      },function(error, response, body){
          if(error) return cb(error,null);
          if(response.statusCode == 404) return cb(new Error(response.statusMessage),null);
          if(utils.isApiMessage(body)) cb(new Error(JSON.stringify(body)), null);
          rcb(null,body);
      });
  }

  return new futApi();
};
