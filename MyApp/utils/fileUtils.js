const fs = require("fs");

//检查文件夹是否存在，不存在则创建一个
function checkDir(path){
    return new Promise((resolve,reject)=>{
        fs.exists(path,function(isExists) {
            if(!isExists){
                fs.mkdir(path,function(err) {
                    if(err){
                        console.log(err)
                        reject(err);
                    }else{
                        resolve()
                    }
                })
            }else{
                resolve();
            }
        })
    })
}
module.exports = {
    checkDir
}
