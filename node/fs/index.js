let fs = require('fs')
let path = require('path')

// fs.readFile(path.join(__dirname, '1.txt'), {flag: 'r'}, function(err, data){
//     if(err) return console.log(err)

//     console.log(data.toString())
// })

// fs.writeFile(path.join(__dirname, '1.txt'),'hello',{mode:0o666},function(err){
//     console.log(err)
// })

function copy(source, target){
    fs.readFile(path.join(__dirname,source), function(err,data){
        if(err) return console.log(err)

        fs.writeFile(path.join(__dirname,target),data,function(err){
            if(err) console.log(err)

        })
    })
}

// copy('1.txt', '2.txt');

// fs.copyFile(path.join(__dirname,'1.txt'),path.join(__dirname,'2.txt'),function(err){
//     if(err) console.log(err)

//     console.log('拷贝成功')
// });

// process.stdout.write('123')
// process.stderr.write('456')

let buffer = Buffer.alloc(3)

// fs.open(path.join(__dirname,'1.txt'), 'r', 0o666, function(err, fd){
//     fs.read(fd, buffer, 0, 2, 0, function(err, bytesRead){
//         console.log(err,bytesRead);
//     })
// })

fs.open(path.join(__dirname,'2.txt'), 'r+', 0o666, function(err, fd){
    fs.write(fd, Buffer.from('天堂'), 0, 3, 3, function(err,btteWritten){
        if(err) return console.log(err);

        console.log(btteWritten)
    })
})

function copySync(source, target){
    let size = 3;
    let buffer = Buffer.alloc(3);

    fs.open(path.join(__dirname,source),'r',function(err, rfd){
        fs.open(path.join(__dirname,target),'w',0o666,function(err,wfd){
            function next(){
                fs.read(rfd, buffer, 0, size, null, function(err, bytesRead){
                    if(bytesRead > 0){
                        fs.write(wfd, buffer, 0, bytesRead, null, function(err,bytesWritten){
                            next();
                        })
                    }else{
                        fs.close(rfd,function(err){
                            if(err) return console.log(err)
                            console.log('读文件结束')
                        });

                        fs.fsync(wfd, function(err){
                            fs.close(wfd, function(){
                                console.log('拷贝成功，关闭读写')
                            })
                        })
                    }
                })
            }

            next();
        })
    })
}
console.log(new Date())
copySync('1.txt', '2.txt')
console.log(new Date())

fs.open(path.join(__dirname, '3.txt'), 'w', function(err, fd){
    fs.write(fd, Buffer.from('测试读写'), 0, 12, 0, function(err, byteWritten){
        fs.fsync(fd, function(){
            fs.close(fd, function(){
                fs.close(fd, function(){
                    console.log('关闭')
                })
            })
        })
    })
})


