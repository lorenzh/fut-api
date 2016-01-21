/*jslint node: true */
"use strict";

module.exports = {
  isApiMessage: function(data){
    var res = (data && data.debug && data.string && data.code && data.reason);
    if(res) return true;
    return false;    
  }
};
