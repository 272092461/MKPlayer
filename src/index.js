var express = require("express");
var app = express();

app.get("/",function(req,res){
    console.log(__dirname);
    
    res.sendFile(__dirname+"/index.html");
})
app.get("/*",function(req,res){
    var path = req.path;
    console.log(path);
    res.sendFile(__dirname+path);
})
var server = app.listen(2333,function(){
    var address = server.address();
    var host = address.host;
    var port = address.port;
    console.log(host+":"+port);
})