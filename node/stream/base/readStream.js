let fs = require('fs');
let path = require('path');
let ReadStream = require('./_ReadStream');

// let rs = fs.createReadStream('1.txt', {
//     flags: 'r',
//     mode: 0o666,
//     autoClose: true,
//     highWaterMark: 3,
//     start: 0,
//     end: 6,

// })

let rs = new ReadStream('1.txt', {
    flags: 'r',
    mode: 0o666,
    autoClose: true,
    encoding:'utf8',
    highWaterMark: 3,
    start: 0,
    end: 6,

})

rs.on('open', () => {
    console.log('文件打开了');
});

rs.on('close', () => {
    console.log('文件关闭了');
});

rs.on('error', (err) => {
    console.log(err);
});

rs.on('data', (data) => {
    console.log(data);

    rs.pause();
});

rs.on('end', () => {
    console.log('end');
});

