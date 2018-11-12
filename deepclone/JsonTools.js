/*
    // const newObj = JSON.parse(JSON.stringify(oldObj));

    方法一：
        JSON对象parse方法可以将JSON字符串反序列化成JS对象，
        stringify方法可以将JS对象序列化成JSON字符串,
        这两个方法结合起来就能产生一个便捷的深克隆

    坑备注：
        1.他无法实现对函数 、RegExp等特殊对象的克隆
        2.会抛弃对象的constructor,所有的构造函数会指向Object
        3.对象有循环引用,会报错
 */

 // 构造函数
function person(pname) {
    this.name = pname;
}
  
const Messi = new person('Messi');

// 函数
function say() {
    console.log('hi');
};

const testObj = {
    a: 1,
    b: [ 'e', 'f', 'g' ],
    c: { h: { i: 2 } }
};

const testNObj = JSON.parse(JSON.stringify(testObj));
console.log(testNObj.c.h, testObj.c.h); // { i: 2 } { i: 2 }
console.log(testObj.c.h === testNObj.c.h); // false
testNObj.c.h.i = 'change';
console.log(testNObj.c.h, testObj.c.h); // { i: 'change' } { i: 2 }
  
const oldObj = {
    a: say,
    b: new Array(1),
    c: new RegExp('ab+c', 'i'),
    d: Messi
};

  
const newObj = JSON.parse(JSON.stringify(oldObj));
  
// 无法复制函数
console.log(newObj.a, oldObj.a); // undefined [Function: say]
// 稀疏数组复制错误
console.log(newObj.b[0], oldObj.b[0]); // null undefined
// 无法复制正则对象
console.log(newObj.c, oldObj.c); // {} /ab+c/i
// 构造函数指向错误
console.log(newObj.d.constructor, oldObj.d.constructor); // [Function: Object] [Function: person]

const errorObj = {};

errorObj.a = errorObj;

const newErrorObj = JSON.parse(JSON.stringify(errorObj));
console.log(newErrorObj.a, errorObj.a); // TypeError: Converting circular structure to JSON



