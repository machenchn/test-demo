let {Duplex} = require('stream');

let d = Duplex({
    read(){
        this.push('hello');
        this.push(null)
    },
    write(chunk, encoding, callback){
        console.log(chunk);
        callback();
    }
})

d.on('data', (data) => {
    console.log(data);
});

d.write('hello');

