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
     },
    isPriceValid: function(coins){
      if(coins < 150) return false;
      if(coins < 1000) return (coins % 50) == 0;
      if(coins < 10000) return (coins % 100) == 0;
      if(coins < 50000) return (coins % 250) == 0;
      if(coins < 100000) return (coins % 500) == 0;
      return (coins % 1000) == 0;
  },
  calculateValidPrice: function(coins){
      if(coins < 150) return 150;
      if(coins < 1000) return coins - (coins % 50);
      if(coins < 10000) return  coins - (coins % 100);
      if(coins < 50000) return coins - (coins % 250);
      if(coins < 100000) return coins - (coins % 500);
      return coins - (coins % 1000);
  },
  calculateNextLowerPrice: function(coins){
      coins = this.calculateValidPrice(coins);
      if(coins <= 150) return 150;
      if(coins <= 1000) return coins - 50;
      if(coins <= 10000) return  coins - 100;
      if(coins <= 50000) return coins - 250;
      if(coins <= 100000) return coins - 500;
      return coins - 1000;
  },
  calculateNextHigherPrice: function(coins){
      coins = this.calculateValidPrice(coins);
      if(coins >= 100000) return coins + 1000;
      if(coins >= 50000) return coins + 500;
      if(coins >= 10000) return coins + 250;
      if(coins >= 1000) return coins + 100;
      return coins + 50;
  },
     getBaseId: function(id){
         while(id > 16777216){
             id -= 16777216;
         }
         return id;
     }
};
