function commentSocket(port){
  //var HOST = '10.105.219.159';
  var app = require('express')();
  var http = require('http').Server(app);
  var io = require('socket.io')(http);
  var io_namespace = new Set(['/']);
  app.get('/', function(req, res){
  	res.send('<h1>Welcome Realtime Server</h1>');
    console.log(1111111111111);
  });
  //当前在线人数
  var onlineCount = 0;

  io.on('connection', function(socket){
  	console.log('a user connected root namespace');
  	onlineCount++;
  	//监听用户退出
  	socket.on('disconnect', function(){
  			//在线人数-1
  			onlineCount--;
  	});
  });
  function newNsp(nsp){
    io.of(nsp).on('connection',function(socket){
      console.log("a user connected "+nsp+" namespace");
      socket.on('message', function(obj){
    		//向其他客户端广播发布的消息
    		this.broadcast.emit('message', obj);
        var jobj = JSON.parse(obj);
    		console.log("receive on nsp" + jobj.data);
    	});
    });
  }
  http.listen(port, function(){
  	console.log('listening on *:8080');
  });
  return {
    newNsp:newNsp
  };
}
module.exports =  commentSocket;
