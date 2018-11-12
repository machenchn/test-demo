let {Transform} = require('stream');

let transform1 = Transform({
    transform(chunk, encoding, callback){
        this.push(chunk.toString().toUpperCase());
        callback();
    }
});

let transform2 = Transform({
    transform(chunk, encoding, callback){
        console.log(chunk.toString());
        callback();
    }
});

process.stdin.pipe(transform1).pipe(transform2);