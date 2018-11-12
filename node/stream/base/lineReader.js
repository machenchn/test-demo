let fs = require('fs');
let EventEmitter = require('events');
let path = require('path');

class LineReader extends EventEmitter {
    constructor(path) {
        super();
        this.RETURN = 0x0d;
        this.LINE = 10;
        this.buffer = [];
        this._rs = fs.createReadStream(path);

        this.on('newListener', (eventName) => {
            if(eventName === 'line'){
                this._rs.on('readable', () => {
                    let char;

                    while(char = this._rs.read(1)){
                        let current = char[0];

                        switch(current){
                            case this.RETURN:
                                this.emit('line', Buffer.from(this.buffer).toString());
                                this.buffer.length = 0;

                                let c = this._rs.read(1);
                                if(c[0] !== this.LINE){
                                    this.buffer.push(c[0]);
                                }
                                break;
                            case this.LINE:
                                this.emit('line', Buffer.from(this.buffer).toString());
                                this.buffer.length = 0;
                            default:
                                this.buffer.push(current);
                        }
                    }
                });

                this._rs.on('end', () => {
                    this.emit('line', Buffer.from(this.buffer).toString());
                    this.buffer.length = 0;
                })
            }
        })
    }
}

let lineReader = new LineReader(path.join(__dirname, './2.txt'));
lineReader.on('line', function (data) {
    console.log(data); // abc , 123 , 456 ,678
})