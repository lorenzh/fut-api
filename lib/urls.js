/*jslint node: true */
"use strict";

var urls = {
    referer: "https://www.easports.com/iframe/fut17/?locale=en_US&baseShowoffUrl=https%3A%2F%2Fwww.easports.com%2Fde%2Ffifa%2Fultimate-team%2Fweb-app%2Fshow-off&guest_app_uri=http%3A%2F%2Fwww.easports.com%2Fde%2Ffifa%2Fultimate-team%2Fweb-app",
    login: {
      main: "https://www.easports.com/fifa/ultimate-team/web-app",
      nucleus: "https://www.easports.com/iframe/fut17/?locale=en_US&baseShowoffUrl=https%3A%2F%2Fwww.easports.com%2Fde%2Ffifa%2Fultimate-team%2Fweb-app%2Fshow-off&guest_app_uri=http%3A%2F%2Fwww.easports.com%2Fde%2Ffifa%2Fultimate-team%2Fweb-app",
      personas: "https://www.easports.com/fifa/api/personas",
      shards: "https://www.easports.com/iframe/fut17/p/ut/shards/v2",
      accounts: "https://www.easports.com/iframe/fut17/p/ut/game/fifa17/user/accountinfo?filterConsoleLogin=true&sku=FUT17WEB&returningUserGameYear=2016&_=",
      session: "https://www.easports.com/iframe/fut17/p/ut/auth",
      question: "https://www.easports.com/iframe/fut17/p/ut/game/fifa17/phishing/question?_=",
      validate: "https://www.easports.com/iframe/fut17/p/ut/game/fifa17/phishing/validate?_="
    },
    api: {
        credits: "/ut/game/fifa17/user/credits",
        tradepile: "/ut/game/fifa17/tradepile",
        removeFromTradepile: "/ut/game/fifa17/trade/{0}",
        watchlist: "/ut/game/fifa17/watchlist",
        pilesize: "/ut/game/fifa17/clientdata/pileSize",
        relist: "/ut/game/fifa17/auctionhouse/relist",
        transfermarket: "/ut/game/fifa17/transfermarket?",
        placebid: "/ut/game/fifa17/trade/{0}/bid",
        listItem: "/ut/game/fifa17/auctionhouse",
        status: "/ut/game/fifa17/trade/status?",
        item: "/ut/game/fifa17/item"
    },
    resource: {
        player: "",
    }
};

module.exports = urls;