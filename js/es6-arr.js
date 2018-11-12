Array.prototype.forEach = function(fn, ctx){
    if(typeof fn != 'function') return;

    for(var i =0, len = this.length; i < len; i++){
        if(Object.prototype.hasOwnProperty.call(this, i)){
            fn.call(ctx,this[i],i,this);
        }
    }
}

Array.prototype.map = function(fn, ctx){
    if(typeof fn != 'function') return;

    var newArr = [];
    for(var i = 0, len = this.length; i < len; i++){
        if(Object.prototype.hasOwnProperty.call(this, i)){
            newArr.push(fn.call(ctx,this[i], i, this));
        }
    }

    return newArr;
}

Array.prototype.filter = function(fn, ctx){
    if(typeof fn != 'function') return;

    var newArr = [];
    for(var i = 0, len = this.length; i < len; i++){
        if(Object.prototype.hasOwnProperty.call(this,i)){
            if(fn.call(ctx, this[i],i,this)){
                newArr.push(this[i]);
            }
        }
    }

    return newArr;
}

Array.prototype.every = function(fn, ctx){
    if(typeof fn != 'function') return;

    var result = true;

    for(var i = 0, len = this.length; i < len; i++){
        if(Object.prototype.hasOwnProperty.call(this,i)){
            if(!result){
                break;
            }
            if(!fn.call(ctx,this[i],i,this)){
                result = false;
            }
            
        }
        return result;
    }

}

Array.prototype.some = function(fn, ctx){
    if(typeof fn != 'function') return;

    var result = false;

    for(var i = 0, len = this.length; i < len; i++){
        if(Object.prototype.hasOwnProperty.call(this,i)){
            if(result){
                break;
            }
            if(fn.call(ctx,this[i],i,this)){
                result = true;
            }
            
        }
        return result;
    }
}

Array.prototype.indexOf = function(item,index){
    var result = -1,
    index = index*1 || 0;

    for(var i = index,len=this.length; i < len; i++){
        if(item === this[i]){
            result = i;
            break;
        }
    }

    return result;
}

Array.prototype.reduce = function(fn,initialVal){
    if(typeof fn != 'function') return;

    var init = initialVal,
        i = 0;

    if(init == void (0)){
        init = this[0];
        i = 1;
    }

    for(i, len = this.length; i < len; i++){
        if(Object.prototype.hasOwnProperty.call(this,i)){
            init = fn(init, this[i], i, this);
        }
    }
    return init;
}