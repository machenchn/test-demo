let fs = require('fs');

let ws = fs.createWriteStream('1.txt', {
    flags: 'w',
    mode: 0o666,
    autoClose: true,
    highWaterMark: 3,
    encoding: 'utf8',
    start: 0
});

let flag = ws.write(1+'', 'utf8', () => {});
console.log(flag);

flag = ws.write(1+'', 'utf8', () => {});
console.log(flag);

flag = ws.write(1+'', 'utf8', () => {});
console.log(flag);

// ws.end('ok');
// ws.write('123');   //  throw er; // Unhandled 'error' event

ws.on('drain', function(){
    console.log('drain')
})

// fs.read()

