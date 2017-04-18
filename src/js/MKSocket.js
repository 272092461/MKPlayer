define(function(){
    var url;
    var socket;
    function init(_url,callback,error){
        if(! ("WebSocket" in window)){
            console.error("你的浏览器不支持WebSocket");
            return;
        }
        _url = "ws://127.0.0.1:8080/server/socket";
        if(_url === undefined){
          return;
        }
        if(callback === undefined){
          callback = function(){};
        }
        if(error === undefined){
          error = function(){};
        }

        url = _url;
        socket = new WebSocket(url);
        socket.addEventListener('open',function(){
          console.log("socket connect succeed");
          this.addEventListener("message",function(evt){
            callback(evt.data);
          });
          socket.send("connect succeed");
        });
        // socket.onmessage = function(evt){
        //     callback(evt.data);                             //收到弹幕将数据交给回调函数
        // };
        socket.addEventListener("error",function(){
            console.log("socket connect error");
            error();
        });
    }
    function send(data){
        if(socket === undefined){
            return;
        }
        socket.send(data);
    }
    return {
        init:init,
        send:send
    };
});
