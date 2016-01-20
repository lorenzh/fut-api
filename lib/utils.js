/*jslint node: true */
"use strict";

module.exports = {
  mergeOptions: function(oDefault,oCustom){
    var keys = Object.keys(oDefault);
    for(var i = 0; i < keys.length; i++) {
      oDefault[keys[i]] = oCustom[keys[i]];
    }
    return oDefault;
  },
  isFunction: function(f){
    return !!(f && f.constructor && f.call && f.apply);
  },
  isStringNullOrWhitespace: function(str) {
    return ((!str || str.length === 0 || /^\s*$/.test(str)) && this.isFunction(str) );
  },
  isApiMessage: function(data){
    var res = (data && data.debug && data.string && data.code && data.reason);
    if(res) return true;
    return false;    
  }
};
