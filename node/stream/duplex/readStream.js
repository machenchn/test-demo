let fs = require('fs');
let EventEmitter = require('events');

function computeNewHighWaterMark(n) {
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;

    return n;
}

class ReadStream extends EventEmitter{
    constructor(path, options) {
        super();
    
        this.path = path;
        this.highWaterMark = options.highWaterMark || 64 * 1024;
        this.autoClose = options.autoClose || true;
        this.start = 0;
        this.end = options.end;
        this.flags = options.flags || 'r';

        this.buffers = []; // 缓存区 
        this.pos = this.start;
        this.length = 0; // 缓存区大小
        this.emittedReadable = false;
        this.reading = false; // 不是正在读取的
        this.open();
        this.on('newListener', (eventName) => {
            if (eventName === 'readable') {
                this.read();
            }
        })

    }

    read(n){
        if(n > this.length){
            this.highWaterMark = computeNewHighWaterMark(n);
            this.emittedReadable = true;
            this._read();
        }

        let buffer = null;
        let index = 0;
        let flag = true;

        if(n > 0 && n <= this.length) {
            buffer = Buffer.alloc(n);

            let buf;

            while(flag && (buf = this.buffers.shift())){
                for(let i = 0; i < buf.length; i++){
                    buffer[index++] = buf[i];

                    if(index === n){
                        flag = false;
                        this.length -= n;

                        let bufferArr = buf.slice(i+1);
                        
                        if(bufferArr.length > 0){
                            this.buffers.unshift(bufferArr);
                        }

                        break;
                    }
                }
            }
        }
        
        if(this.length == 0){
            this,this.emittedReadable = true;
        }

        if(this.length < this.highWaterMark){
            if(!this.reading){
                this.reading = true;

                this._read();
            }
        }

        return buffer;
    }

    _read(){
        if(typeof this.fs !== 'number'){
            return this.once('open', () => this._read());
        }

        let buffer = Buffer.alloc(this.highWaterMark);

        fs.read(this.fd, buffer, 0, buffer.length, this.pos, (err, bytesRead) => {
            if(bytesRead > 0){
                this.buffers.push(buffer.slice(0, bytesRead));
                this.pos += bytesRead;
                this.length += bytesRead;
                this.reading = false;

                if(this.emittedReadable){
                    this.emittedReadable = false;
                    this.emit('readable');
                }
            }else{
                this.emit('end');
                this.destroy();
            }
        })
    }

    destroy() {
        if (typeof this.fd !== 'number') {
            return this.emit('close')
        }
        fs.close(this.fd, () => {
            this.emit('close')
        })
    }

    open() {
        fs.open(this.path, this.flags, (err, fd) => {
            if (err) {
                this.emit('error', err);
                if (this.autoClose) {
                    this.destroy();
                }
                return
            }
            this.fd = fd;
            this.emit('open');
        });
    }
}

module.exports = ReadStream;