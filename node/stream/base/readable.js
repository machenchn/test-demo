let fs = require('fs');
let path = require('path');
let rs = fs.createReadStream(path.join(__dirname, '1.txt'), {
    highWaterMark:3
});

// rs.on('data');

rs.on('readable', () => {
    let result = rs.read(1);
    console.log(rs._readableState.length);

    setTimeout(() => {
        console.log(rs._readableState.length);
    },1000)
})