define(["socketIO"],function(io){
    var url;
    var socket;
    function init(_url,callback,error){
        if(! ("WebSocket" in window)){
            console.error("你的浏览器不支持WebSocket");
            return;
        }
        _url = "ws://127.0.0.1:8080/comment-otsukimi.xml";
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
        socket = io.connect(url);
        socket.on('connect',function(){
          console.log("socket connect succeed");
          this.on("message",function(evt){
            console.log(evt);
            callback(evt);
          });
        });
        // socket.onmessage = function(evt){
        //     callback(evt.data);                             //收到弹幕将数据交给回调函数
        // };
        socket.on("error",function(e){
            console.error(e);
            error();
        });
    }
    function send(data){
        if(socket === undefined){
            return;
        }
        socket.emit("message",data);
    }
    return {
        init:init,
        send:send
    };
});
