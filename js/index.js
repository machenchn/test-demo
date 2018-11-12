
(() => {
    var ndContainer = document.getElementById('js-list');
    if (!ndContainer) {
        return;
    }
    for (var i = 0; i < 3; i++) {
        var ndItem = document.createElement('li');
        ndItem.innerText = i + 1;
        ndContainer.appendChild(ndItem);
        console.log(i);
    }

    // say()
    function say(){
        console.log(new Date);
        console.log(1);
        // setTimeout(say,1000);
    }
    function say2(){
        console.log(new Date);
        console.log(2);
        // setTimeout(say,1000);
    }
    setTimeout(say,1100)
    setTimeout(say2,100)


    function debounce(fn, delay){
        let timer = null;

        return function (){
            let self = this;
            let args = arguments;
            
            clearTimeout(timer);

            timer = setTimeout(function(){
                fn.apply(self,args);
            },delay)
        }
    }

    const debounce = (func, wait, ...args) => {// 非立即执行
        let timeout;
        return function(){
            const context = this;
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(context, args)
            },wait);
        }
    }
    
    const debounce = (func, wait, ...args) => { // 立即执行
        let timeout;
        return function(){
            const context = this;
            if (timeout) cleatTimeout(timeout);
            let callNow = !timeout;
            timeout = setTimeout(() => {
                timeout = null;
            },wait)
        
            if(callNow) func.apply(context,args)
        }
    }

    /**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
function debounce(func,wait,immediate) { // 综合
    var timeout;

    return function () {
        var context = this;
        var args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            var callNow = !timeout;
            timeout = setTimeout(function(){
                timeout = null;
            }, wait)
            if (callNow) func.apply(context, args)
        }
        else {
            timeout = setTimeout(function(){
                func.apply(context, args)
            }, wait);
        }
    }
}

      


    function throttle (fn, delay){
        var start = Date.now();

        return function(){
            var self = this;
            var args = arguments;

            var now = Date.now();
            if(now - start >= delay){
                fn.apply(self,args);
                start = Date.now();
            }
        }
    }

 
    const throttle = (func, wait, ...args) => {  // 时间戳
        let pre = 0;
        return function(){
            const context = this;
            let now = Date.now();
            if (now - pre >= wait){
                func.apply(context, args);
                pre = Date.now();
            }
        }
    }

    const throttle = (func, wait, ...args) => {  // 定时器
        let timeout;
        return function(){
            const context = this;
            if(!timeout){
                timeout = setTimeout(() => {
                    timeout = null;
                    func.apply(context,args);
                },wait)
            }
        }
    }

 /**
    其实时间戳版和定时器版的节流函数的区别就是，
    时间戳版的函数触发是在时间段内开始的时候，
    而定时器版的函数触发是在时间段内结束的时候。
 * @desc 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param type 1 表时间戳版，2 表定时器版
 */
function throttle(func, wait ,type) {  // 结合
    if(type===1){
        var previous = 0;
    }else if(type===2){
        var timeout;
    }

    return function() {
        var context = this;
        var args = arguments;
        if(type===1){
            var now = Date.now();

            if (now - previous > wait) {
                func.apply(context, args);
                previous = now;
            }
        }else if(type===2){
            if (!timeout) {
                timeout = setTimeout(function() {
                    timeout = null;
                    func.apply(context, args)
                }, wait)
            }
        }

    }
}

      
      

})();


