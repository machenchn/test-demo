let fs = require('fs');
let path = require('path');
let WriteStream = require('./_WriteStream');

let ws = fs.createWriteStream(path.join(__dirname, '1.txt'), {
    hightWaterMark: 3,
    autoClose: true,
    flags: 'w',
    encoding: 'utf8',
    mode: 0o666,
    start: 0
});

for(let i = 0; i < 9; i++){
    let flag = ws.write(i + '');
    console.log(flag);
}

let wss = new WriteStream(path.join(__dirname, '2.txt'), {
    highWaterMark: 3,
    autoClose: true,
    flags: 'w',
    encoding: 'utf8',
    mode: 0o666,
    start: 0
});

let i = 9;
function write(){
    let flag = true;

    while(i > 0 && flag){
        flag = wss.write(--i + '', 'utf8', () => {
            console.log('ok');
        })
    }
}
write();

wss.on('drain', () => {
    console.log('抽干');
    write();
})


