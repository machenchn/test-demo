function myPromise(constructor){
    let self=this;
    self.status="pending" //定义状态改变前的初始状态
    self.value=undefined;//定义状态为resolved的时候的状态
    self.reason=undefined;//定义状态为rejected的时候的状态
    self.onFullfilledArray=[];
    self.onRejectedArray=[];
    function resolve(value){
       if(self.status==="pending"){
          self.value=value;
          self.status="resolved";
          self.onFullfilledArray.forEach(function(f){
                f(self.value);
                //如果状态从pending变为resolved，
                //那么就遍历执行里面的异步方法
          });
        
       }
    }
    function reject(reason){
       if(self.status==="pending"){
          self.reason=reason;
          self.status="rejected";
          self.onRejectedArray.forEach(function(f){
              f(self.reason);
             //如果状态从pending变为rejected， 
             //那么就遍历执行里面的异步方法
          })
       }
    }
    //捕获构造异常
    try{
       constructor(resolve,reject);
    }catch(e){
       reject(e);
    }
}

myPromise.prototype.then=function(onFullfilled,onRejected){
   let self=this;
   switch(self.status){
      case "pending":
        self.onFullfilledArray.push(function(){
             onFullfilled(self.value)
        });
        self.onRejectedArray.push(function(){
             onRejected(self.reason)
        });
      case "resolved":
        onFullfilled(self.value);
        break;
      case "rejected":
        onRejected(self.reason);
        break;
      default:       
   }
}

myPromise.prototype.all = function(arr){
    return new Promise((resolve,reject) => {
        var newArr = [];
        let toDo = 0;

        for(let i of arr){
            i.then(data => {
                newArr[i] = data;
                toDo += 1;

                if(toDo == arr.length){
                    resolve(newArr);
                }
            })
        }
    })
}

myPromise.prototype.finally = function(cb){
    let p = this.constructor;

    return new Promise((value) => p.resolve(cb()).then(() => value),
    (reason) => p.resolve(cb()).then(() => {throw reason}))

}

myPromise.prototype.race = function(arr){
    return new Promise( (resolve,reject) => {
        for(var i =0 ; i < arr.length; i++){
            arr[i].then(resolve,reject);
        }
    })
}