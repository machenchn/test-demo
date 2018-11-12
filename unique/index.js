/*  双重循环去重
Array.prototype.unique = function () {
    const newArray = [];
    let isRepeat;
    for (let i = 0; i < this.length; i++) {
        isRepeat = false;
        for (let j = 0; j < newArray.length; j++) {
            if (this[i] === newArray[j]) {
                isRepeat = true;
                break;
            }
        }
        if (!isRepeat) {
            newArray.push(this[i]);
        }
    }
    return newArray;
}


Array.prototype.unique = function () {
  const newArray = [];
  let isRepeat;
  for (let i = 0; i < this.length; i++) {
    isRepeat = false;
    for (let j = i + 1; j < this.length; j++) {
      if (this[i] === this[j]) {
        isRepeat = true;
        break;
      }
    }
    if (!isRepeat) {
      newArray.push(this[i]);
    }
  }
  return newArray;
}

*/

/*  indexof去重
    基本思路：如果索引不是第一个索引，说明是重复值。

    实现一：

    利用Array.prototype.filter()过滤功能
    Array.prototype.indexOf()返回的是第一个索引值
    只将数组中元素第一次出现的返回
    之后出现的将被过滤掉

    Array.prototype.unique = function () {
        return this.filter((item, index) => {
            return this.indexOf(item) === index;
        })
    }

    Array.prototype.unique = function () {
        const newArray = [];
        this.forEach(item => {
            if (newArray.indexOf(item) === -1) {
            newArray.push(item);
            }
        });
        return newArray;
        }

        
        
        */
 /* Array.prototype.sort()    
    基本思路：先对原数组进行排序，然后再进行元素比较。

    Array.prototype.unique = function () {
        const newArray = [];
        this.sort();
        for (let i = 0; i < this.length; i++) {
            if (this[i] !== this[i + 1]) {
                newArray.push(this[i]);
            }
        }
        return newArray;
    }

*/

/* Array.prototype.includes()  

    Array.prototype.unique = function () {
        const newArray = [];
        this.forEach(item => {
            if (!newArray.includes(item)) {
            n   ewArray.push(item);
            }
        });
        return newArray;
    }

 */

/* Array.prototype.reduce()
    Array.prototype.unique = function () {
        return this.sort().reduce((init, current) => {
            if(init.length === 0 || init[init.length - 1] !== current){
                init.push(current);
            }
            return init;
        }, []);
    }

*/ 

/* 对象键值对
    基本思路：利用了对象的key不可以重复的特性来进行去重。
    但需要注意：

    无法区分隐式类型转换成字符串后一样的值，比如 1 和 '1'
    无法处理复杂数据类型，比如对象（因为对象作为 key 会变成 [object Object]）
    特殊数据，比如 'proto'，因为对象的 proto 属性无法被重写

    解决第一、第三点问题，实现一：
    Array.prototype.unique = function () {
        const newArray = [];
        const tmp = {};
        for (let i = 0; i < this.length; i++) {
            if (!tmp[typeof this[i] + this[i]]) {
                tmp[typeof this[i] + this[i]] = 1;
                newArray.push(this[i]);
            }
        }
        return newArray;
    }

    解决第二点问题，实现二：
    Array.prototype.unique = function () {
        const newArray = [];
        const tmp = {};
        for (let i = 0; i < this.length; i++) {
            // 使用JSON.stringify()进行序列化
            if (!tmp[typeof this[i] + JSON.stringify(this[i])]) {
                // 将对象序列化之后作为key来使用
                tmp[typeof this[i] + JSON.stringify(this[i])] = 1;
                newArray.push(this[i]);
            }
        }
        return newArray;
    }

    
 */

 /* Map
    实现一：
    Array.prototype.unique = function () {
        const newArray = [];
        const tmp = new Map();
        for(let i = 0; i < this.length; i++){
                if(!tmp.get(this[i])){
                    tmp.set(this[i], 1);
                    newArray.push(this[i]);
                }
            }
        return newArray;
    }
    实现二：
    Array.prototype.unique = function () {
        const tmp = new Map();
        return this.filter(item => {
            return !tmp.has(item) && tmp.set(item, 1);
        })
    }

    
 */

/* Set
    
    Array.prototype.unique = function () {
        const set = new Set(this);
        return Array.from(set);
    }

    Array.prototype.unique = function () {
        return [...new Set(this)];
    }

    
 */
const arr = [];

// 生成[0, 100000]之间的随机数
for (let i = 0; i < 100000; i++) {
  arr.push(0 + Math.floor((100000 - 0 + 1) * Math.random()))
}

// ...实现算法

console.time('test');
// arr.unique();
console.timeEnd('test');
