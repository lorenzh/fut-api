/*jslint node: true */
"use strict";
var utils = require("./lib/utils");

var futapi = function(options){
  var __ = require("underscore");
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

  futApi.prototype.login = function(email, password, secret, platform, tfCodeCb, loginCb){
    login.login(email, password, secret,platform, tfCodeCb, function(error, result){
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
      sendRequest(urls.api.relist,{xHttpMethod: "PUT"}, cb);
  };
  
  futApi.prototype.search = function(filter,cb){
      var defaultFilter = {
          type: "player",
          start: 0,
          num: 16
      };
      
      defaultFilter = __.extend(defaultFilter, filter);
      
      if(defaultFilter.maskedDefId)
        defaultFilter.maskedDefId = utils.getBaseId(defaultFilter.maskedDefId);
      
      sendRequest(urls.api.transfermarket + toUrlParameters(defaultFilter), cb);
  }
  
    
  futApi.prototype.placeBid = function(tradeId, bid, cb){
      var tId = 0;
      var bData = {"bid":bid};
      
      if(!utils.isPriceValid(bid))
        return cb(new Error("Price is invalid."));
      
      if(__.isNumber(tradeId))
        tId = tradeId;
      else if(__.isObject(tradeId) && tradeId.tradeId && __.isNumber(tradeId.tradeId))
        tId = tradeId.tradeId;
      
      if(tId === 0) return cb(new Error("Tradid is value is not allowed."));
      
      sendRequest(utils.format(urls.api.placebid,[tId]),
      {
            xHttpMethod: "PUT", 
            body: bData
      }, cb);
  }
  
  futApi.prototype.listItem = function(itemDataId, startingBid, buyNowPrice, duration, cb){
      
      if([3600, 10800, 21600, 43200, 86400, 259200].indexOf(duration) < 0) 
        return cb(new Error("Duration is invalid."));
      
      if(!utils.isPriceValid(startingBid) || !utils.isPriceValid(buyNowPrice))
        return cb(new Error("Starting bid or buy now price is invalid."));
      
      
      var data = {
          "duration": duration,
          "itemData": { "id":itemDataId} ,
          "buyNowPrice": buyNowPrice,
          "startingBid": startingBid
      };
      
      sendRequest(urls.api.listItem,{
          xHttpMethod: "POST",
          body: data 
      }, cb);
  };
  
  futApi.prototype.getStatus = function(tradIds, cb){
      var urlParameters = "tradeIds=";
            
      for(var i = 0; i < tradIds.length ; i++)
          urlParameters += tradIds[i] + "%2c";

      sendRequest(urls.api.status + urlParameters.substr(0,urlParameters.length - 3), cb);
  };
  
  futApi.prototype.addToWatchlist = function(tradeId, cb){
      var data = {"auctionInfo":[{"id":tradeId}]};
      sendRequest(urls.api.watchlist+ utils.format("?tradeId={0}",[tradeId]), {  xHttpMethod: "PUT", body: data }, cb);
  };
  
  futApi.prototype.removeFromWatchlist = function(tradeId, cb){
      sendRequest(urls.api.watchlist  + utils.format("?tradeId={0}",[tradeId]), {  xHttpMethod: "DELETE" }, cb);
  }
  
  futApi.prototype.removeFromTradepile = function(tradeId, cb){
      sendRequest(utils.format(urls.api.removeFromTradepile,[tradeId]), {  xHttpMethod: "DELETE" }, cb);
  }
  
  futApi.prototype.sendToTradepile = function(itemDataId, cb){
      var data = {"itemData":[{"pile":"trade","id":itemDataId}]};
      sendRequest(urls.api.item, {  xHttpMethod: "PUT", body: data }, cb);
  };
  
  futApi.prototype.sendToClub = function(itemDataId, cb){
      var data = {"itemData":[{"pile":"club","id":itemDataId}]};
      sendRequest(urls.api.item, {  xHttpMethod: "PUT", body: data }, cb);
  };
  
  futApi.prototype.quickSell = function(itemDataId, cb ){
      sendRequest(urls.api.item  + utils.format("/{0}",[itemDataId]), {  xHttpMethod: "DELETE" }, cb);
  };
  
  function toUrlParameters(obj){
      var str = "";
      var keys = Object.keys(obj);
      for(var i = 0; i < keys.length;i++){
          str += keys[i] + "=" + encodeURI(obj[keys[i]]).replace(/%5B/g, '[').replace(/%5D/g, ']') + "&";
      }
      return str.substr(0, str.length - 1);
  }
  
  function sendRequest(url,options,cb){
      var defaultOptions = {
          xHttpMethod: "GET",
          headers: {}
      }

      if(__.isFunction(options)){
        cb = options;        
      }
      else if(__.isObject(options)) {
          defaultOptions = __.extend(defaultOptions,options);
      }
      
      defaultOptions.headers["X-HTTP-Method-Override"] = defaultOptions.xHttpMethod;
      delete defaultOptions.xHttpMethod;
      
      loginResponse.apiRequest.post(url,
      defaultOptions,
      function(error, response, body){
          if(error) return cb(error,null);
          if(response.statusCode == 404) return cb(new Error(response.statusMessage),null);
          if(utils.isApiMessage(body)) cb(new Error(JSON.stringify(body)), null);
          cb(null,body);
      });
  }

  return new futApi();
};


futapi.isPriceValid = utils.isPriceValid;
futapi.calculateValidPrice = utils.calculateValidPrice;
futapi.calculateNextLowerPrice = utils.calculateNextLowerPrice;
futapi.calculateNextHigherPrice = utils.calculateNextHigherPrice;
futapi.getBaseId = utils.getBaseId;
module.exports = futapi;