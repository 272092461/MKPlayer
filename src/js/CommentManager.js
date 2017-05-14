define(["MKCanvas","CommentSpaceAllocator","CommentLoader","CommentParser","CommentBuilder","MKSocket"],function(MKCanvas,comment,loader,parser,builder,socket){
    var canvas;
    var _listener = {};
    var timeline;
    var video;
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
    function init(_canvas,_url,socket_url,_video){
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
        socket.init(socket_url,receiveCommentXML);
        video = _video;
        loader.load(_url,function(xml){
            timeline = parser.create(xml);
            dispatchEvent("load");
        });
        initAnimationFrame();
    }
    function test(_canvas,_url){
        canvas = _canvas;
        // canvas.width = 800;
        // canvas.height = 600;
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
          if(innerTime>1000 || innerTime<0){
            timeto(video.currentTime*1000);
            return;
          }
          move(innerTime);
          run(innerTime);
          time+=innerTime;
          if(timer){
            stop();
          }
          timer = requestDraw(arguments.callee);
        });
    }
    function requestDraw(callback){
      var date = video.currentTime*1000;
      var innerTime;
      return requestAnimationFrame(function(excTime){
        var lastdate = video.currentTime*1000;
        innerTime = lastdate - date;
        draw();
        callback(innerTime);
      });
    }
    function initAnimationFrame() {                         //为requestAnimationFrame提供兼容性方案
        var vendors = ['webkit', 'moz'];

        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || // Webkit中此取消方法的名字变了
                window[vendors[x] + 'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function(callback, element) {
                var lastTime = 0;
                var currTime = video.currentTime*1000;
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
        stop();
        start();
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
        csa.resize(_width,_height-10);
        builder.resize(_width,_height-10);
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
    function receiveComment(comment){
        var index = parser.add(comment);
        if(index<=position){
          //position++;
        }
    }
    function receiveCommentXML(data){
        var cjson = JSON.parse(data);
        var obj = {};
        var xml = createXML(cjson.data);
        var d = xml.getElementsByTagName('d')[0];
        var opt = d.getAttribute("p").split(",");
        var stime = Math.round(opt[0] * 1000);
        if(stime<time){                                  //在当前帧之前 移动播放轴
          position++;
        }
        else if(stime<time+20){                           //在当前帧中 移动至下一帧
          stime = stime+20;
        }
        obj.stime = stime;
        obj.mode = parseInt(opt[1]);
        obj.size = parseInt(opt[2]);
        obj.color = parseInt(opt[3]);
        obj.date = parseInt(opt[4]);
        obj.pool = parseInt(opt[5]);
        if (opt[7] != null)
            obj.dbid = parseInt(opt[7]);
        obj.hash = opt[6];
        obj.text = d.childNodes[0].nodeValue.replace(/(\/n|\\n|\n|\r\n)/g, "\n");
        parser.add(obj);
    }
    function createXML(str){
  　　if(document.all){
    　　var xmlDom=new ActiveXObject("Microsoft.XMLDOM");
    　　xmlDom.loadXML(str);
    　　return xmlDom;
  　　}
  　　else
    　　return new DOMParser().parseFromString(str, "text/xml");
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
    function reset(){
      time = 0;
      position = 0;
      runline=[];
      MKCanvas.clear();
      csa.scroll.clear();
      csa.scrollbtm.clear();
      csa.bottom.clear();
      csa.top.clear();
      csa.reserve.clear();
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
        receiveComment:receiveComment,
        reset:reset
    };
});
