var express = require("express");
var commentSocket = require('./server/socket')(8080);
var app = express();
var http = require('http').Server(app);
var io = require("socket.io")(http);
var nspSet = new Set();

app.get("/",function(req,res){
    console.log(__dirname);
    res.sendFile(__dirname+"/index.html");
});
app.get("/*",function(req,res){
    var path = req.path;
    console.log(path);
    res.sendFile(__dirname+path);
    var pattern = /\/.*\.xml$/;
    var io_namespace = path.match(pattern);
    if(io_namespace === null){return;}
    else{
      io_namespace = io_namespace[0];
      if(!nspSet.has(io_namespace)){
        nspSet.add(io_namespace);
        commentSocket.newNsp(io_namespace);
      }
    }
});
var server = app.listen(2333,function(){
    var address = server.address();
    var host = address.host;
    var port = address.port;
    console.log(host+":"+port);
});
