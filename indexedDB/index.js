const request = indexedDB.open('myDatabase', 1);

request.addEventListener('upgradeneeded', e => {
    const db = e.target.result;
    const  store = db.createObjectStore('Users', {keyPath: 'userId', autoIncrement: false});
    console.log('创建对象仓库成功');
});

request.addEventListener('success', e => {
    const db = e.target.result;

    const tx = db.transaction('Users','readwrite');

    const store = tx.objectStore('Users');
    
    // 保存数据
    const reqAdd = store.add({'userId': 1, 'userName': '李白', 'age': 24});

    reqAdd.addEventListener('success', e => {
        console.log('保存成功')
    })
})

request.addEventListener('error', e => {
    console.log('数据连接失败~');
})


