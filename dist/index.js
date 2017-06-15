var express = require("express");
var commentSocket = require('./server/socket')(8080);
var app = express();
var http = require('http').Server(app);
var io = require("socket.io")(http);
var nspSet = new Set();

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.use('/static',function(req,res,next){
    var path = req.path;
    console.log(path);
    var pattern = /\/.*\.xml$/;
    var io_namespace = path.match(pattern);

    if(io_namespace === null){
      next();
      return;
    }
    else{
      io_namespace = io_namespace[0];
      console.log("namespace_"+ io_namespace);
      if(!nspSet.has(io_namespace)){
        nspSet.add(io_namespace);
        commentSocket.newNsp(io_namespace);
      }
    }
    next();
},express.static('static'));
// app.get("/*",function(req,res){
//     var path = req.path;
//     console.log(path);
//     res.sendFile(__dirname+path);
//     var pattern = /\/.*\.xml$/;
//     var io_namespace = path.match(pattern);
//     if(io_namespace === null){return;}
//     else{
//       io_namespace = io_namespace[0];
//       if(!nspSet.has(io_namespace)){
//         nspSet.add(io_namespace);
//         commentSocket.newNsp(io_namespace);
//       }
//     }
// });
var server = app.listen(2333,function(){
    var address = server.address();
    var host = address.host;
    var port = address.port;
    console.log(host+":"+port);
});
