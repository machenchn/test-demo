console.log(console.log(module.paths))

let buffer = Buffer.alloc(6,1)
// console.log(buffer)
// console.log('--------------------------------')

let buffer2 = Buffer.allocUnsafe(6)
let buffer3 = buffer2.fill(1, 3, 5)
// console.log(buffer2)
// console.log('--------------------------------')
// console.log(buffer3)
// console.log('--------------------------------')
// console.log(Buffer.from('数据结构'))
// console.log('--------------------------------')
// console.log(Buffer.from([16, 17, 18]))
// console.log('--------------------------------')

let buffer4 = Buffer.alloc(12)

let buf1 = '数'
let buf2 = '据结构'

// console.log(buffer4)
// buffer4.write(buf1, 0, 3, 'utf8')
// console.log(buffer4)
// buffer4.write(buf2, 3, 9, 'utf8')
// console.log(buffer4)
// console.log(buffer4.toString())

let buffer5 = Buffer.alloc(12)

// buffer5.write(buf2,3,9)
// buffer5.write(buf1,0,3)
// console.log(buffer5.toString())

let buffer6 = Buffer.alloc(6, 1)
let buff1 = Buffer.from('测');
let buff2 = Buffer.from('试');
// let newBuffer = buffer6.slice(0, 3)  // 浅拷贝

// newBuffer[0] = 100
// console.log(buffer6)

Buffer.prototype.myCopy = function (targetBuffer, offset, sourceStart, sourceEnd) {
    for (let i = sourceStart; i < sourceEnd; i++) {
        targetBuffer[offset++] = this[i];
    }
}
// console.log(buffer6);
// buff1.myCopy(buffer6, 3, 0, 3);
// buff2.myCopy(buffer6, 0, 0, 3);
// console.log(buffer6.toString());
// console.log(buff1.toString());
// console.log(buff2.toString());


Buffer.myConcat = function(list, totalLength){
    if(list.length == 1){
        return list[0]
    }

    if(typeof totalLength === 'undefined') {
        totalLength = list.reduce((prev, next) => {
            return prev + next.length
        },0)
    }

    let buf = Buffer.alloc(totalLength);
    let pos = 0;
    
    list.forEach(function(buffer, index){
        for(var i = 0; i < buffer.length; i++) {
            buf[pos++] = buffer[i];
        }
    })

    return buf.fill(0, pos)
    
}

console.log(Buffer.myConcat([buff1, buff2, buff1, buff2]));


let buffer7 = Buffer.from('天堂-天-地-地-天-狱')

console.log(buffer7.indexOf('--', 8))

Buffer.prototype.split = function(sep){
    let arr =[];
    let len = Buffer.from(sep).length;
    let pos = 0;

    while(-1!=(index = this.indexOf(sep,pos))){
        arr.push(this.slice(pos,index));
        pos = index+len;
    }

    arr.push(this.slice(pos));

    return arr;
}

console.log(buffer7.split('天').map(item=>item.toString()));


