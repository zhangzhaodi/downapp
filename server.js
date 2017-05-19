//1.引入需要依赖模块
const http = require('http');
const fs =require('fs');
const url = require('url');
const mime = require('mime');

//2.创建服务器  监听端口
http.createServer(function(req,res){  //req服务器接收  res响应客户端
    //3.url pathname获取所有目录文件   query？？？
    let {pathname,query} = url.parse(req.url,true);
    console.log(pathname)
    //4.后台配置路由
    if(pathname == '/'){  // 4.1 /根目录
        res.setHeader('Content-Type','text/html;charset=utd8'); //4.2 向客户端相应头部
        fs.createReadStream('./index.html').pipe(res);  //4.3  读取index 用管道pipe 写入到res 相应给客户端
    }else{ //5. 如果路径不是文件里的路径 相应客户端404
        fs.exists('.'+pathname,function(flag){ //5.1 exists查找路径有无 返回true/false  ？？？
            if(flag){  //5.2 如果有     mimelookup(文件名)自动匹配文档类型
                res.setHeader('Content-Type',mime.lookup(pathname)+';charset=utf8');
                fs.createReadStream('.'+pathname).pipe(res) // 读取 写入
            }else{
                //5.3 如果没有
                res.statusCode = 404;  //404编码
                res.end('Not found!');   //结束 并响应给客户端 Not found!
            }
        })
    }
}).listen(8081,function(){
    console.log('run  8080 ')
});