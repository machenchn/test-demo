let {Readable} = require('stream');

let index = 9;

class MyRead extends Readable{
    _read(){
        if(index -- > 0) {
            return this.push('123');

            this.push(null);
        }
    }
}

let mr = new MyRead;
mr.on('data', (data) => {
    console.log(data);
})
