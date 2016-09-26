# fut-api - FIFA 17 - unofficial

[![NPM](https://nodei.co/npm/fut-api.png)](https://nodei.co/npm/fut-api/)

## Usage
### Create a new instance
```javascript
var futapi = require("fut-api");
var apiClient = new futapi([options]);
```
##### Options
- saveCookie - (default: false) stores the cookiejar after login
- saveCookiePath - (default: null) path to the cookiejar 
- loadCookieFromSavePath - (default: false) loads the cookiejar from the saveCookiePath

## Login
```javascript
    
  function twoFactorCodeCb(next){
      /* send your authentication code with the "next" method */
      next("123456");
  }

    
    apiClient.login("username","password","secret", "platform",
    	twoFactorCodeCb,
    	function(error,response){
    	if(error) {
        	return console.log("Unable to login.");
        }
    	console.log("logged in.");
		
		apiClient.getCredits(function(error, response){ });
		
    });
```
* platform: "ps3","ps4","pc","x360","xone"

## Credits


```javascript
  apiClient.getCredits(function(error, response){ });
```
* response: Object
	* credits: number
	* bidTokens: ??
	* currencies: []
        * name: string
        * funds: number
        * finalFunds: number
	* unopenedPacks: Object
        * preOrderPacks: number
        * recoveredPacks: number


## Pilesize
```javascript
  apiClient.getPilesize(function(error, response){ });
```
* response: Object
    * entries: []
        * value: number
        * key: number -> 2 == Tradepile, 4 == Watchlist

## Tradepile
```javascript
  apiClient.getTradepile(function(error, response){ });
```
* response: Object
    * credits: number
    * currencies: []
        * name: string - values "COINS","POINTS","DRAFT_TOKEN"
        * funds: number
        * finalFunds: number
    * duplicateItemIdList: ??
    * errorState: ??
    * auctionInfo: []
        * bidState: string
        * buyNowPrice: number
        * confidenceValue: number
        * currentBid: number
        * expires: number
        * offers: number
        * sellerEstablished: number
        * sellerId: number
        * sellerName: string
        * startingBid: number
        * tradeId: number
        * tradeOwner: boolean
        * tradeState: string
        * watched: boolean
        * itemData: object
            * assetId: number
            * assists: number
            * attributeList: []
                * index: number
                * value: number
            * cardsubtypeid: number
            * contract: number
            * discardValue: number
            * fitness: number
            * formation: string
            * id: number
            * injuryGames: number
            * injuryType: string
            * itemState: string
            * itemType: string
            * lastSalePrice: number
            * leagueId: number
            * lifetimeAssists: number
            * lifetimeStats: []
                * index: number
                * value: number
            * loyaltyBonus: number
            * morale: number
            * nation: number
            * owners: number
            * pile: number
            * playStyle: number
            * preferredPosition: string
            * rareflag: number
            * rating: number
            * resourceId: number
            * statsList: []
                * index: number
                * value: number
            * suspension: number
            * teamid: number
            * timestamp: number
            * training: number
            * untradeable: boolean

## Relist tradepile
```javascript
  apiClient.relist(function(error, response){ });
```
* response: Object
    * tradeIdList: []
        * id: number
        
## Watchlist
```javascript
  apiClient.getWatchlist(function(error, response){ });
```

* response: -> see tradepile response

## Transfermarket
```javascript
  apiClient.search({type: "player", lev: "gold", maskedDefId: 183907, pos: "CB" }, function(error, response){ });
```

* filter 
    * searchFilterBase
        * type: string 		-> player, training, development
        * start: number 	-> page
        * num: number 		-> items per page
        * micr: number		-> min bid
        * macr: number		-> max bid
        * minb: number		-> min buy
        * maxb: number		-> max buy
        * lev: string		-> bronze, silver, gold
        
    * playerSearchFilter extends searchFilterBase
        * maskedDefId: number 	-> baseId
        * rare: string 		-> SP
        * zone: string 		-> defence, midfield, attacker
        * pos: string		-> GK, CB, LB, RB, ...
        * nat: number		-> nationId
        * leag: number		-> leagueId
        * team: number		-> teamId
        * playStyle: number	-> playerStyleId
        
    * consumableFilter extends searchFilterBase
        * cat: string		-> playerTraining, GKTraining, position, playStyle, managerLeagueModifier, contract, fitness, healing
        
    * positionChangeSearchFilter extends consumableFilter
        * pos: string		-> LB-LWB (OLD-NEW)
        
    * playerStyleSearchFilter extends consumableFilter
        * playStyle: number	-> playerStyleId
    
* response: -> see tradepile response

## Place bid
```javascript
  apiClient.placeBid(tradeId, coins, function(error, response){ });
```

* tradId: number
* coins: number
* response: -> see tradepile response

## List item
```javascript
  apiClient.listItem(itemDataId, startingBid, buyNowPrice, duration, function(error, response){ });
```
* itemDataId: number -> itemData.id
* startingBid: number
* buyNowPrice: number
* duration: number -> seconds -> valid values 3600 = 1h, 10800 = 3h, 21600 = 6h, 43200 = 12h, 86400 = 1d, 259200 = 3d

* response: 
	* id: number
	
## Auction status
```javascript
  apiClient.getStatus([tradeIds], function(error, response){ });
```
* tradeIds: number[] -> tradeId
* response: -> see tradepile response

## Add to watchlist
```javascript
  apiClient.addToWatchlist(tradeId, function(error){ });
```
* tradeId: number -> tradeId

## remove from tradepile
```javascript
  apiClient.removeFromTradepile(tradeId, function(error){ });
```
* tradeId: number -> tradeId

## remove from watchlist
```javascript
  apiClient.removeFromWatchlist(tradeId, function(error){ });
```
* tradeId: number -> tradeId

## send to tradepile
```javascript
  apiClient.sendToTradepile(itemDataId, function(error, response){ });
```
* itemDataId: number -> itemData.id
* response: Object
    * itemData: []
        * id: number
        * pile: string
        * success: boolean
        
## send to tradepile
```javascript
  apiClient.sendToClub(itemDataId, function(error, response){ });
```
* itemDataId: number -> itemData.id
* response: Object
    * itemData: []
        * id: number
        * pile: string
        * success: boolean
        
## Quick sell
```javascript
  apiClient.quickSell(itemDataId, function(error, response){ });
```
* itemDataId: number -> itemData.id
* response: Object
    * items: []
        * id: number
    * totalCredits: number
    
## Functions

### Validate price/coins
```javascript
    futapi.isPriceValid(coins);
```
returns true or false

### Calculate valid price/coins
```javascript
    futapi.calculateValidPrice(coins);
```
returns valid coins amount

### Calculate next lower price/coins
```javascript
    futapi.calculateNextLowerPrice(coins);
```
returns next lower coins after calculating valid price

### Calculate next higher price/coins
```javascript
    futapi.calculateNextHigherPrice(coins);
```
returns next higher coins after calculating valid price