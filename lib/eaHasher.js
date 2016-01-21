/*jslint node: true */
"use strict";

var hasher = (function () {
    function hasher() {
        this.r1Shifts = [7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22];
        this.r2Shifts = [5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20];
        this.r3Shifts = [4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23];
        this.r4Shifts = [6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21];
        this.hex_chr = "0123456789abcdef";
    }
    hasher.prototype.md5 = function (str) {
        var that = this;
        var x = that.chunkMessage(str);
        var a = 1732584193;
        var b = -271733879;
        var c = -1732584194;
        var d = 271733878;
        for (var i = 0; i < x.length; i += 16) {
            var tempA = a;
            var tempB = b;
            var tempC = c;
            var tempD = d;
            a = that.md5_f(a, b, c, d, x[i + 0], that.r1Shifts[0], -680876936);
            d = that.md5_f(d, a, b, c, x[i + 1], that.r1Shifts[1], -389564586);
            c = that.md5_f(c, d, a, b, x[i + 2], that.r1Shifts[2], 606105819);
            b = that.md5_f(b, c, d, a, x[i + 3], that.r1Shifts[3], -1044525330);
            a = that.md5_f(a, b, c, d, x[i + 4], that.r1Shifts[4], -176418897);
            d = that.md5_f(d, a, b, c, x[i + 5], that.r1Shifts[5], 1200080426);
            c = that.md5_f(c, d, a, b, x[i + 6], that.r1Shifts[6], -1473231341);
            b = that.md5_f(b, c, d, a, x[i + 7], that.r1Shifts[7], -45705983);
            a = that.md5_f(a, b, c, d, x[i + 8], that.r1Shifts[8], 1770035416);
            d = that.md5_f(d, a, b, c, x[i + 9], that.r1Shifts[9], -1958414417);
            c = that.md5_f(c, d, a, b, x[i + 10], that.r1Shifts[10], -42063);
            b = that.md5_f(b, c, d, a, x[i + 11], that.r1Shifts[11], -1990404162);
            a = that.md5_f(a, b, c, d, x[i + 12], that.r1Shifts[12], 1804603682);
            d = that.md5_f(d, a, b, c, x[i + 13], that.r1Shifts[13], -40341101);
            c = that.md5_f(c, d, a, b, x[i + 14], that.r1Shifts[14], -1502002290);
            b = that.md5_f(b, c, d, a, x[i + 15], that.r1Shifts[15], 1236535329);
            a = that.md5_g(a, b, c, d, x[i + 1], that.r2Shifts[0], -165796510);
            d = that.md5_g(d, a, b, c, x[i + 6], that.r2Shifts[1], -1069501632);
            c = that.md5_g(c, d, a, b, x[i + 11], that.r2Shifts[2], 643717713);
            b = that.md5_g(b, c, d, a, x[i + 0], that.r2Shifts[3], -373897302);
            a = that.md5_g(a, b, c, d, x[i + 5], that.r2Shifts[4], -701558691);
            d = that.md5_g(d, a, b, c, x[i + 10], that.r2Shifts[5], 38016083);
            c = that.md5_g(c, d, a, b, x[i + 15], that.r2Shifts[6], -660478335);
            b = that.md5_g(b, c, d, a, x[i + 4], that.r2Shifts[7], -405537848);
            a = that.md5_g(a, b, c, d, x[i + 9], that.r2Shifts[8], 568446438);
            d = that.md5_g(d, a, b, c, x[i + 14], that.r2Shifts[9], -1019803690);
            c = that.md5_g(c, d, a, b, x[i + 3], that.r2Shifts[10], -187363961);
            b = that.md5_g(b, c, d, a, x[i + 8], that.r2Shifts[11], 1163531501);
            a = that.md5_g(a, b, c, d, x[i + 13], that.r2Shifts[12], -1444681467);
            d = that.md5_g(d, a, b, c, x[i + 2], that.r2Shifts[13], -51403784);
            c = that.md5_g(c, d, a, b, x[i + 7], that.r2Shifts[14], 1735328473);
            b = that.md5_g(b, c, d, a, x[i + 12], that.r2Shifts[15], -1926607734);
            a = that.md5_h(a, b, c, d, x[i + 5], that.r3Shifts[0], -378558);
            d = that.md5_h(d, a, b, c, x[i + 8], that.r3Shifts[1], -2022574463);
            c = that.md5_h(c, d, a, b, x[i + 11], that.r2Shifts[2], 1839030562);
            b = that.md5_h(b, c, d, a, x[i + 14], that.r3Shifts[3], -35309556);
            a = that.md5_h(a, b, c, d, x[i + 1], that.r3Shifts[4], -1530992060);
            d = that.md5_h(d, a, b, c, x[i + 4], that.r3Shifts[5], 1272893353);
            c = that.md5_h(c, d, a, b, x[i + 7], that.r3Shifts[6], -155497632);
            b = that.md5_h(b, c, d, a, x[i + 10], that.r3Shifts[7], -1094730640);
            a = that.md5_h(a, b, c, d, x[i + 13], that.r3Shifts[8], 681279174);
            d = that.md5_h(d, a, b, c, x[i + 0], that.r3Shifts[9], -358537222);
            c = that.md5_h(c, d, a, b, x[i + 3], that.r3Shifts[10], -722521979);
            b = that.md5_h(b, c, d, a, x[i + 6], that.r3Shifts[11], 76029189);
            a = that.md5_h(a, b, c, d, x[i + 9], that.r3Shifts[12], -640364487);
            d = that.md5_h(d, a, b, c, x[i + 12], that.r3Shifts[13], -421815835);
            c = that.md5_h(c, d, a, b, x[i + 15], that.r3Shifts[14], 530742520);
            b = that.md5_h(b, c, d, a, x[i + 2], that.r3Shifts[15], -995338651);
            a = that.md5_i(a, b, c, d, x[i + 0], that.r4Shifts[0], -198630844);
            d = that.md5_i(d, a, b, c, x[i + 7], that.r4Shifts[1], 1126891415);
            c = that.md5_i(c, d, a, b, x[i + 14], that.r4Shifts[2], -1416354905);
            b = that.md5_i(b, c, d, a, x[i + 5], that.r4Shifts[3], -57434055);
            a = that.md5_i(a, b, c, d, x[i + 12], that.r4Shifts[4], 1700485571);
            d = that.md5_i(d, a, b, c, x[i + 3], that.r4Shifts[5], -1894986606);
            c = that.md5_i(c, d, a, b, x[i + 10], that.r4Shifts[6], -1051523);
            b = that.md5_i(b, c, d, a, x[i + 1], that.r4Shifts[7], -2054922799);
            a = that.md5_i(a, b, c, d, x[i + 8], that.r4Shifts[8], 1873313359);
            d = that.md5_i(d, a, b, c, x[i + 15], that.r4Shifts[9], -30611744);
            c = that.md5_i(c, d, a, b, x[i + 6], that.r4Shifts[10], -1560198380);
            b = that.md5_i(b, c, d, a, x[i + 13], that.r4Shifts[11], 1309151649);
            a = that.md5_i(a, b, c, d, x[i + 4], that.r4Shifts[12], -145523070);
            d = that.md5_i(d, a, b, c, x[i + 11], that.r4Shifts[13], -1120210379);
            c = that.md5_i(c, d, a, b, x[i + 2], that.r4Shifts[14], 718787259);
            b = that.md5_i(b, c, d, a, x[i + 9], that.r4Shifts[15], -343485551);
            b = that.md5_i(b, c, d, a, x[i + 9], that.r4Shifts[15], -343485551);
            a = that.add(a, tempA);
            b = that.add(b, tempB);
            c = that.add(c, tempC);
            d = that.add(d, tempD);
        }
        return that.numToHex(a) + that.numToHex(b) + that.numToHex(c) + that.numToHex(d);
    };
    hasher.prototype.numToHex = function (num) {
        var str = "";
        for (var j = 0; j <= 3; j++) {
            str += this.hex_chr.charAt((num >> (j * 8 + 4)) & 0x0F) + this.hex_chr.charAt((num >> (j * 8)) & 0x0F);
        }
        return str;
    };
    hasher.prototype.chunkMessage = function (str) {
        var nblk = ((str.length + 8) >> 6) + 1;
        var blks = new Array(nblk * 16);
        for (var i = 0; i < nblk * 16; i++) {
            blks[i] = 0;
        }
        for (var i = 0; i < str.length; i++) {
            blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
        }
        blks[i >> 2] |= 0x80 << ((i % 4) * 8);
        blks[nblk * 16 - 2] = str.length * 8;
        return blks;
    };
    hasher.prototype.add = function (x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    };
    hasher.prototype.cmn = function (q, a, b, x, s, t) {
        return this.add(this.bitwiseRotate(this.add(this.add(a, q), this.add(x, t)), s), b);
    };
    hasher.prototype.md5_f = function (a, b, c, d, x, s, t) {
        return this.cmn((b & c) | ((~b) & d), a, b, x, s, t);
    };
    hasher.prototype.md5_g = function (a, b, c, d, x, s, t) {
        return this.cmn((b & d) | (c & (~d)), a, b, x, s, t);
    };
    hasher.prototype.md5_h = function (a, b, c, d, x, s, t) {
        return this.cmn(b ^ c ^ d, a, b, x, s, t);
    };
    hasher.prototype.md5_i = function (a, b, c, d, x, s, t) {
        return this.cmn(c ^ (b | (~d)), a, b, x, s, t);
    };
    hasher.prototype.bitwiseRotate = function (x, c) {
        return (x << c) | (x >>> (32 - c));
    };
    return hasher;
})();
module.exports = function (value) { return new hasher().md5(value); };
