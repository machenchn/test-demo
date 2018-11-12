let fs = require('fs');
let path = require('path');

let rs = fs.createReadStream(path.join(__dirname, './1.txt'), {
    flags: 'r',
    autoClose: true,
    encoding: 'utf8',
    start: 0,
    highWaterMark: 3
});

rs.on('readable', () => {
    let result = rs.read(5);
    
    console.log(result);
})