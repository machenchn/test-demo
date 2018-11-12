let fs = require('fs');
let path = require('path');
let ReadStream = require('./_ReadStream');
let WriteStream = require('./_WriteStream');

let rs = new ReadStream(path.join(__dirname, './1.txt'), {
    highWaterMark: 4
});

let ws = new WriteStream(path.join(__dirname, './2.txt'), {
    highWaterMark: 4
});

rs.pipe(ws);