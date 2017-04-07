define(["MKCanvas","CommentSpaceAllocator","CommentLoader","CommentParser","CommentBuilder","MKSocket"],function(MKCanvas,comment,loader,parser,builder,socket){
    var canvas;
    var _listener = {};
    var timeline;
    var runline = [];
    var timer;
    var width;
    var height;
    var time = 0;
    var position = 0;
    var innerTime = 15;                                     //每帧canvas时间
    var csa = {};
    csa.init = function(_width,_height){
        for(var name in this){
            if("init" in this[name]){
                this[name].init(_width,_height);
            }
        }
    };
    csa.resize = function(_width,_height){
        for(var name in this){
            if("resize" in this[name]){
                this[name].resize(_width,_height);
            }
        }
    };
    function init(_canvas,_url,socket_url){
        canvas = _canvas;
        canvas.width = 800;
        canvas.height = 600;
        MKCanvas.bind(_canvas);
        builder.init({
            width:canvas.width,
            height:canvas.height}
                    );
        csa.scroll = comment.create();
        csa.scrollbtm = comment.create();
        csa.bottom = comment.create();
        csa.top = comment.create();
        csa.reserve = comment.create();
        csa.init(canvas.width,canvas.height);
        socket.init(socket_url,receiveComment);
        loader.load(_url,function(xml){
            timeline = parser.create(xml);
            dispatchEvent("load");
        });
        initAnimationFrame();
    }
    function test(_canvas,_url){
        console.log("testing---");
        canvas = _canvas;
        canvas.width = 800;
        canvas.height = 600;
        MKCanvas.bind(_canvas);
        builder.init({
            width:canvas.width,
            height:canvas.height}
                    );
        csa.scroll = comment.create();
        csa.scrollbtm = comment.create();
        csa.bottom = comment.create();
        csa.top = comment.create();
        csa.reserve = comment.create();
        csa.init(canvas.width,canvas.height);
        loader.load(_url,function(xml){
            timeline = parser.create(xml);
            start();
        });
    }
    // function start(){
    //     if(timer == null){
    //         timer = setInterval(function(){
    //             move(innerTime);
    //             run(innerTime);
    //             draw();
    //             time+=innerTime;
    //         },innerTime);
    //     }
    // }
    var times = 0;
    function start(){
        requestDraw(function(innerTime){
          move(innerTime);
          run(innerTime);
          time+=innerTime;
          timer = requestDraw(arguments.callee);
        });
    }
    function requestDraw(callback){
      var date = new Date();
      var innerTime;
      return requestAnimationFrame(function(excTime){
        var lastdate = new Date();
        innerTime = lastdate - date;
        draw();
        callback(innerTime);
      });
    }
    function initAnimationFrame() {
        var vendors = ['webkit', 'moz'];

        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || // Webkit中此取消方法的名字变了
                window[vendors[x] + 'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
                var id = window.setTimeout(function() {
                    callback(currTime + timeToCall);
                }, timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        }
        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
        }
    }
    function run(interTime){
        while(timeline[position] && timeline[position].stime < time + interTime){
            send(timeline[position]);
            position++;
        }
    }
    // function stop(){
    //     console.log("stop");
    //     clearInterval(timer);
    //     timer=null;
    // }
    function stop(){
        console.log(timer);
        cancelAnimationFrame(timer);
        timer=null;
    }
    function timeto(nextTime){
        time = nextTime;
        position = binSearch(time,timeline);
        runline=[];
        MKCanvas.clear();
        csa.scroll.clear();
        csa.scrollbtm.clear();
        csa.bottom.clear();
        csa.top.clear();
        csa.reserve.clear();
    }
    function move(time){
        for(var i = 0;i<runline.length;i++){
            runline[i].time(time);
        }
    }
    function draw(){
        if(runline.length === 0){
            return;
        }
        MKCanvas.clear();
        MKCanvas.add(runline);
        MKCanvas.draw();
    }
    function send(data){
        var cmt = builder.builder(data);
        switch(cmt.mode){
            case 1:{
                cmt.align=0;
                csa.scroll.add(cmt);
                break;
            }
            case 2:{
                cmt.align=2;
                csa.scrollbtm.add(cmt);
                break;
            }
            case 4:{
                cmt.align=2;
                csa.bottom.add(cmt);
                break;
            }
            case 5:{
                cmt.align=0;
                csa.top.add(cmt);
                break;
            }
            case 6:{
                cmt.align=1;
                csa.reserve.add(cmt);
                break;
            }
        }
        cmt.onFinish = commentRemove;
        runline.push(cmt);
    }
    function commentRemove(comment){
        var index = runline.indexOf(comment);
        if(index != -1){
            runline.splice(index,1);
        }
        switch(comment.mode){
            case 1:
                csa.scroll.remove(comment);
                break;
            case 2:
                csa.scrollbtm.remove(comment);
                break;
            case 4:
                csa.bottom.remove(comment);
                break;
            case 5:
                csa.top.remove(comment);
                break;
            case 6:
                csa.reserve.remove(comment);
                break;
        }
    }
    function resize(_width,_height){
        width = _width;
        height = _height;
        canvas.width = _width;
        canvas.height= _height;
        csa.resize(_width,_height);
        builder.resize(_width,_height);
    }
    function dispatchEvent(name){
        var calls = _listener[name];
        if(calls != undefined){
            for(var i = 0;i<calls.length;i++){
                calls[i]();
            }
        }
    }
    function addEventListener(name,callback){
        if(_listener[name] == undefined){
            _listener[name] = [];
        }
        _listener[name].push(callback);
    }
    function receiveComment(xml){
        parser.addXML(xml);
    }
    function binSearch(time,arr){
        if(arr.length == 0){
            return 0;
        }
        else if(time<=arr[0].stime){
            return 0;
        }
        else if(time>=arr[arr.length-1].stime){
            return arr.length-1;
        }
        else{
            var find = false;
            var start = 0;
            var stop =arr.length;
            var position;
            while(!find){
                position = start + parseInt((stop-start)/2);
                if(arr[position-1].stime<= time && arr[position].stime>= time){
                    find = true;
                    return position;
                }
                else if(arr[position].stime>time){
                    stop = position;
                }
                else{
                    start = position+1;
                }
            }
        }
    }
    function getTime(){
        return time;
    }
    return{
        init:init,
        start:start,
        stop:stop,
        timeto:timeto,
        addEventListener:addEventListener,
        resize:resize,
        getTime:getTime,
        test:test,
        send:send
    };
});
