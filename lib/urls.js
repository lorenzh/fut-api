/*jslint node: true */
"use strict";

var urls = {
    referer: "https://www.easports.com/iframe/fut16/?baseShowoffUrl=https%3A%2F%2Fwww.easports.com%2Fde%2Ffifa%2Fultimate-team%2Fweb-app%2Fshow-off&guest_app_uri=http%3A%2F%2Fwww.easports.com%2Fde%2Ffifa%2Fultimate-team%2Fweb-app&locale=en_US",
    login: {
      main: "https://www.easports.com/fifa/ultimate-team/web-app",
      nucleus: "https://www.easports.com/iframe/fut16/?locale=en_US&baseShowoffUrl=https%3A%2F%2Fwww.easports.com%2Fde%2Ffifa%2Fultimate-team%2Fweb-app%2Fshow-off&guest_app_uri=http%3A%2F%2Fwww.easports.com%2Fde%2Ffifa%2Fultimate-team%2Fweb-app",
      personas: "https://www.easports.com/fifa/api/personas",
      shards: "https://www.easports.com/iframe/fut16/p/ut/shards/v2",
      accounts: "https://www.easports.com/iframe/fut16/p/ut/game/fifa16/user/accountinfo?sku=FUT16WEB&returningUserGameYear=2015&_=",
      session: "https://www.easports.com/iframe/fut16/p/ut/auth",
      question: "https://www.easports.com/iframe/fut16/p/ut/game/fifa16/phishing/question?_=",
      validate: "https://www.easports.com/iframe/fut16/p/ut/game/fifa16/phishing/validate?_="
    },
    api: {
        credits: "/ut/game/fifa16/user/credits",
        tradepile: "/ut/game/fifa16/tradepile",
        watchlist: "/ut/game/fifa16/watchlist",
        pilesize: "/ut/game/fifa16/clientdata/pileSize",
        relist: "/ut/game/fifa16/auctionhouse/relist",
        transfermarket: "/ut/game/fifa16/transfermarket?",
        placebid: "/ut/game/fifa16/trade/{0}/bid",
        listItem: "/ut/game/fifa16/auctionhouse",
        status: "/ut/game/fifa16/trade/status?",
        item: "/ut/game/fifa16/item"
    },
    resource: {
        player: "",
    }
};

module.exports = urls;
