function commentSocket(port){
  //var HOST = '10.105.219.159';

  var http = require("http");
  var crypto = require("crypto");
  var server = http.createServer(function(req,res){
    res.writeHead('200',{'Content-Type':'text/plain'});
    res.end("websocket\n");
  });
  var socketCollect = new Set();
  server.listen(8080);
  console.log('server listen at port 8080');
  server.on('upgrade',function(req,socket,upgradeHead){ //http协议升级为socket
    var head = new Buffer(upgradeHead.length);
    upgradeHead.copy(head);
    var key = req.headers['sec-websocket-key'];
    var shasum = crypto.createHash('sha1');
    key = shasum.update(key + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11").digest("base64");
    var headers = [
      'HTTP1.1 101 Switching Protocols',
      'Upgrade:websocket',
      'Connection:Upgrade',
      'Sec-WebSocket-Accept:' + key,
    ];
    socket.setNoDelay(true);
    socket.write(headers.concat('','').join('\r\n'));
    //var ws = new WebSocket(socket);
    var ws = socket;
    socketCollect.add(ws);
    ws.on('data',function(evt){
      console.log(evt);
    });
    ws.on("data",function(data){
        console.log("data"+ws.remoteAddress+":   "+data);
        //sendToOther(data,ws);
        ws.write("You send succeed");
    });
    ws.on("end",function(){
        socketCollect.delete(ws);
    });
    ws.on("error",function(){
        socketCollect.delete(ws);
    });
  });
  function sendToOther(message,from){
      socketCollect.forEach(function(value){
        if(value != from){
          value.write(message);
        }
      });
  }
}
module.exports =  commentSocket;
