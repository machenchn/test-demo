let EventEmitter = require('events');
let fs = require('fs');

class ReadStream extends EventEmitter {
    constructor(path, options){
        super();
        this.path = path;
        this.flags = options.flags || 'r';
        this.autoClose = options.autoClose || true;
        this.highWaterMark = options.highWaterMark || 64*1024;
        this.start = options.start || 0;
        this.end = options.end;
        this.encoding = options.encoding || null;

        this.open();

        this.flowing = null;
        // 看是否监听了data事件，如果监听了 就要变成流动模式

        this.buffer = Buffer.alloc(this.highWaterMark);

        this.pos = this.start;
        this.on('newListener', (eventName, callback) => {
            if(eventName == 'data'){
                this.flowing = true;

                this.read();
            }
        })
    }

    read(){
        if(typeof this.fd !== 'number'){
            return this.once('open', () => {
                this.read();
            })
        }

        let howMuchToRead = this.end ? Math.min(this.highWaterMark, this.end - this.pos + 1) : this.highWaterMark;
        fs.read(this.fd, this.buffer, 0, howMuchToRead, this.pos, (err, bytesRead) => {
            if(bytesRead > 0){
                this.pos += bytesRead;
                let data = this.encoding ? this.buffer.slice(0, bytesRead).toString(this.encoding) : this.buffer.slice(0, bytesRead);
                this.emit('data', data);

                if(this.pos > this.end){
                    this.emit('end');
                    this.destory();
                }
                
                if(this.flowing){
                    this.read();
                }
            }else{
                this.emit('end');
                this.destory();
            }
        })
    }

    pipe(ws){
        this.on('data', (chunk) => {
            let flag = ws.write(chunk);

            if(!flag){
                this.pause();
            }
        })

        ws.on('drain', () => {
            this.resume();
        })
    }

    resume(){
        this.flowing = true;
        this.read();
    }

    pause(){
        this.flowing = false;
    }

    destory(){
        if(typeof this.fd === 'number'){
            fs.close(this.fd, () => {
                this.emit('close');
            });
            return;
        }

        this.emit('close');
    }

    open(){
        fs.open(this.path, this.flags, (err, fd) => {
            if(err){
                this.emit('error', err);
                if(this.autoClose){
                    this.destory();
                }

                return;
            }
            this.fd = fd;
            this.emit('open');
        })
    }
}

module.exports = ReadStream;