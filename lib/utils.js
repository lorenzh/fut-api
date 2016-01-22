/*jslint node: true */
"use strict";

module.exports = {
  isApiMessage: function(data){
    var res = (data && data.debug && data.string && data.code && data.reason);
    if(res) return true;
    return false;    
  },
  format: function(pattern, values){
     for(var i = 0; i < values.length; i++)
         pattern = pattern.replace("{"+i+"}", values[i]);  
     return pattern;  
     }
};
