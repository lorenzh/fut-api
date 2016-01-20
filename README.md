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

### Login
```javascript
    
	function twoFactorCodeCb(next){
		/* send your authentication code with the "next" method */
		next("123456");
	}
    
    
    apiClient.login("username","password","secret", 
	    twoFactorCodeCb,
	    function(error,response){
		    if(error) return console.log("Unable to login.");
		    console.log("logged in.");
	    });
```
