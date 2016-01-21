# fut-api - FIFA 16

[![NPM](https://nodei.co/npm/fut-api.png)](https://nodei.co/npm/fut-api/)

## ToDo's
* implement the Login
	* ~~login~~
	* ~~send the two factor code~~
	* ~~cancel the authentication update~~
	* ~~extract the hash funktion from the Fifa - WebApp~~
	* ~~get/set cookieJar~~
	* check if secret is required
* implement the API requests
	* ~~get credits~~
	* ~~get tradepile~~
	* ~~get watchlist~~
	* ~~get purchased items~~
	* transfermarket search
		* search player 
		* search consumable
		* search employee
		* search club items
	* place bid
	* list on transfermarket
	* ~~relist items~~
	* get transfertiems update
	* send items to watchlist
	* send items to tradepile
* basic functions
	* calculate vaild price
	* calculate next lower price
	* calculate next higher price
	* get baseId
	

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

    
    apiClient.login("username","password","secret", 
    	twoFactorCodeCb,
    	function(error,response){
    	if(error) {
        	return console.log("Unable to login.");
        }
    	console.log("logged in.");
    });
```

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
        * key: number 

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
  apiClient.getWatchlist(filter, function(error, response){ });
```

* filter: Object
    * type: string -> values "player" (default:"player")
    * start: number -> page (default:0)
    * num: number -> items count (default:16)
* response: -> see tradepile response