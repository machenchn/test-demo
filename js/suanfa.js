function sum(...args){
    if([...args].length==1){
        let sum2 = [...args][0];
        var suum = function (y){
            sum2 +=y;
            console.log(`output ${sum2}`)
            return suum; 
        }
        suum.valueOf = function(){
            return sum2;
        }
        return suum; 
    }else{
        let sum1 = 0;
        for(var i = 0;i<[...args].length;i++){
            sum1 += [...args][i]; 
            }
        console.log(`outPut1 ${sum1}`);
    } 
} 



var money= [20,10,5,1]; 
function greedyMoney(m,n){ 
    for(var i=0;i<m.length;i++){ 
        while(n>=m[i] && n>0){ 
            document.write(m[i]+" "); 
            n = n-m[i]; 
        } 
    } 
  document.write("<br>"); 
 }

 greedyMoney(money,73);
 greedyMoney([25,10,1],63);

 function getMoney(arr,money){
     var retArr = [];
     for(let i=0;i<arr.legth;i++){
         while(money >= arr[i] && money > 0){
            arr.push(arr[i]);
            money = money - arr[i];
         }
     }
    return retArr;
 }

    //end是多少数内的斐波那契数列
function fibona(end){
    var num1 = 0,num2 = 1,num3;
    var arr = [];
    for(var i = 3;i<=end;i++){
        num3 = num1 + num2;
        num1 = num2;
        num2 = num3;
        
        if(num3>=end){
            break;
        }
        
        arr.push(num3);
    }
    return arr;
}
console.log(fibona(20));//[1, 2, 3, 5, 8, 13]

function fibonaSum(n){
    if(n==0){
        return 0;
    }else if(n==1){
        return 1;
    }else{
        return fibonaSum(n-1)+fibonaSum(n-2);
    }
}
console.log(fibonaSum(10));//55

    //end是多少数内的斐波那契数列
function fibona(end){
    var num1 = 0,num2 = 1,num3;
    var arr = [];
    for(var i = 3;i<=end;i++){
        num3 = num1 + num2;
        num1 = num2;
        num2 = num3;
        
        if(num3>=end){
            break;
        }
        
        arr.push(num3);
    }
    return arr;
}
console.log(fibona(20));//[1, 2, 3, 5, 8, 13]

function fibonaSum(n){
    if(n==0){
        return 0;
    }else if(n==1){
        return 1;
    }else{
        return fibonaSum(n-1)+fibonaSum(n-2);
    }
}
console.log(fibonaSum(10));//55
