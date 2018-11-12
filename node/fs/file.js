let fs = require('fs');
let path = require('path');

// fs.watchFile('3.txt', function(current, prev){
//     console.log(current);
//     if(Date.parse(current.ctime) == 0){
//         console.log('删除')
//     }else if(Date.parse(prev.ctime) == 0){
//         console.log('创建')
//     }else{
//         console.log('修改')
//     }
// })

// fs.rename('bbbbb','3.txt')

// fs.truncate('3.txt',5); //截断

// fs.mkdir('mkdir', function(err){
//     if(err) return console.log(err);
// })


// 异步 广度遍历 删除文件
function preWide(dir){
    let arrs = [dir]; // 存放目录结构的数组
    let index = 0; // 指针
    let current;
    while(current = arrs[index++]){ // current可能是文件
        let stat = fs.statSync(current);
        if(stat.isDirectory()){
            let files = fs.readdirSync(current); // [b,c]
            // [a,a/b,a/c,a/b/d,a/b/e,a/c/m];
            arrs = [...arrs,...files.map(file=>{
                return path.join(current,file)
            })];
        }
    }
    for(var i = arrs.length-1 ;i>=0;i--){
        let stat = fs.statSync(arrs[i]);
        if(stat.isDirectory()){
            fs.rmdirSync(arrs[i]);
        }else{
            fs.unlinkSync(arrs[i]);
        }
    }
}

// preWide('mkdir')

// fs.mkdirSync('mkdir')
// fs.rmdir('mkdir',()=>{console.log('创建完成')})

// fs.unlinkSync('3.txt');
// fs.unlink('a.js',()=>{})

function rmdir(dir,callback){
    console.log(dir);
    fs.readdir(dir,function(err,files){
        // 读取到文件
        function next(index){
            if(index===files.length) return fs.rmdir(dir,callback);
            let newPath = path.join(dir,files[index]);
            fs.stat(newPath,function(err,stat){
                if(stat.isDirectory()){ // 如果是文件夹
                    // 要读的是b里的第一个 而不是去读c
                    // 如果b里的内容没有了 应该去遍历c
                    rmdir(newPath,()=>next(index+1));
                }else{
                    // 删除文件后继续遍历即可
                    fs.unlink(newPath,()=>next(index+1))
                }
            })
        }
        next(0);
    });
}

// rmdir('mkdir',function(){
//     console.log('删除成功');
// });


// 异步删除文件promise

function removePromise(dir){
    return newPromise(function(resolve, reject){
        fs.stat(dir, function(err, stat){
            if(stat.isDirectory()){
                fs.readdir(dir, function(err, files){
                    files = files.map(file => path.join(dir, file));
                    files = files.map(file => removePromise(file));

                    Promise.all([files]).then(function(){
                        fs.rmdir(dir, resolve);
                    })
                })
            }else{
                fs.unlink(dir, resolve)
            }
        })
    })
}

//同步删除
function removeDir(dir) {
    let files = fs.readdirSync(dir);// 读取到所有内容
    for (var i = 0; i < files.length; i++) {
        let newPath =path.join(dir,files[i]);
        let stat = fs.statSync(newPath);
        if(stat.isDirectory()){
            // 如果是文件夹 就递归走下去
            removeDir(newPath); // 递归
        }else{
            fs.unlinkSync(newPath);
        }
    }
    fs.rmdirSync(dir); // 如果文件夹是空的就将自己删除掉
}

// fs.statSync
// fs.stat('a',function(err,stat){ // 文件夹的状态
//     // stat对象可以判断是文件还是文件夹,如果文件不存在则会出err
//     console.log(stat.isFile());
//     // 读取当前文件夹下的内容
//      if(stat.isDirectory()){
//          fs.readdir('a',function(err,files){
//             console.log(files)
//          })
//      }
// })

// 异步创建
function mkdirSync(dir, callback){
    let paths = dir.split('/');

    function next(index){
        if(index > paths.length) return callback();

        let newPath = paths.slice(0, index).join('/');
        
        fs.access(newPath, function(err){
            if(err){
                fs.mkdir(newPath,function(err){
                    next(index+1)
                })
            }else{
                next(index+1)
            }
        })
    }
    next(1);
}

mkdirSync('a/e/w/q/m/n',function(){
    console.log('完成')
});

function makep(dir) {
    let paths = dir.split('/');
    for (let i = 1; i <= paths.length; i++) {
        let newPath = paths.slice(0, i).join('/');
        // 创建目录需要先干一件事
        try {
            fs.accessSync(newPath, fs.constants.R_OK);
        } catch (e) {
            fs.mkdirSync(newPath)
        }
    }
}
makep('a/b/c/d/e');  // a   a/b