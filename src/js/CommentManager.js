define(["MKCanvas","CommentSpaceAllocator","CommentLoader","CommentParser","CommentBuilder","MKSocket"],function(MKCanvas,comment,loader,parser,builder,socket){
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
    // var csa = {};
    var csa = [];
    Object.assign(csa,{
      init: function(_width,_height){
        this.forEach(( item, index ) => item.init(_width,_height));
      },
      resize: function(_width,_height){
        this.forEach(( item, index ) => item.resize(_width,_height));
      },
      clear: function(){
        this.forEach( ( item, index ) => item.clear() );
      }
    });
    // csa.init = function(_width,_height){
    //     for(var name in this){
    //         if("init" in this[name]){
    //             this[name].init(_width,_height);
    //         }
    //     }
    // };
    // csa.resize = function(_width,_height){
    //     for(var name in this){
    //         if("resize" in this[name]){
    //             this[name].resize(_width,_height);
    //         }
    //     }
    // };
    function init(_canvas,_url,socket_url,_video){
        MKCanvas.bind(_canvas);
        builder.init();
        csa[1] = csa[2] = csa[3] = comment.create();
        csa[4] = comment.create();
        csa[5] = comment.create();
        csa[6] = comment.create();
        // csa.scroll = comment.create();
        // csa.scrollbtm = comment.create();
        // csa.bottom = comment.create();
        // csa.top = comment.create();
        // csa.reserve = comment.create();
        csa.init(_canvas.width,_canvas.height);
        socket.init(socket_url,receiveCommentXML);
        video = _video;
        loader.load(_url,function(xml){
            timeline = parser.create(xml);
            dispatchEvent("load");
        });
        initAnimationFrame();
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
    // function create({ canvas, comment_url, socket_url, video }){
    //   init( canvas, comment_url, socket_url, video );
    // }
    var times = 0;
    function start(){
        var drawLoop = function (innerTime) {
          if(innerTime>1000 || innerTime<0){
            timeto(video.currentTime*1000);
            return;
          }
          time+=innerTime;
          if(timer){
            stop();
          }
          move(innerTime);
          run(innerTime);
          timer = requestDraw(drawLoop);
        }

        requestDraw(drawLoop);
    }
    function requestDraw(callback){
      var date = video.currentTime*1000;
      var innerTime;
      return (() => {
          return requestAnimationFrame(function(excTime){
            var lastdate = video.currentTime*1000;
            innerTime = lastdate - date;
            MKCanvas.clear();
            MKCanvas.draw();
            callback(innerTime);
          });
      })() | drawCache();                                                       //先请求绘制下一帧 再进入绘制计算
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
    function stop(){
        cancelAnimationFrame(timer);
        timer=null;
    }
    function timeto(nextTime){
        time = nextTime;
        position = binSearch(time,timeline);
        runline=[];
        MKCanvas.clear();
        csa.forEach(( item, index ) => item.clear());
        // csa.scroll.clear();
        // csa.scrollbtm.clear();
        // csa.bottom.clear();
        // csa.top.clear();
        // csa.reserve.clear();
        stop();
        start();
    }
    function move(time){
        for(var i = 0;i<runline.length;i++){
            runline[i].time(time);
        }
    }
    function drawCache(){
        if(runline.length === 0){
            return;
        }
        MKCanvas.clearCache();
        MKCanvas.add(runline);
        MKCanvas.drawCache();
    }
    function send(data){
        var cmt = builder.builder(data);
        switch(cmt.mode){
            case 1:{
                cmt.align=0;
                csa[1].add(cmt);
                runline.push(cmt);
                break;
            }
            case 2:{
                cmt.align=2;
                csa[2].add(cmt);
                runline.push(cmt);
                break;
            }
            case 4:{
                cmt.align=2;
                csa[4].add(cmt);
                runline.push(cmt);
                break;
            }
            case 5:{
                cmt.align=0;
                csa[5].add(cmt);
                runline.push(cmt);
                break;
            }
            case 6:{
                cmt.align=1;
                csa[6].add(cmt);
                runline.push(cmt);
                break;
            }
        }
        cmt.onFinish = commentRemove;
    }
    function commentRemove(comment){
        var index = runline.indexOf( comment );
        if(index != -1){
            runline.splice( index, 1 );
        }
        csa[comment.mode].remove( comment );
        // switch(comment.mode){
        //     case 1:
        //         csa.scroll.remove(comment);
        //         break;
        //     case 2:
        //         csa.scrollbtm.remove(comment);
        //         break;
        //     case 4:
        //         csa.bottom.remove(comment);
        //         break;
        //     case 5:
        //         csa.top.remove(comment);
        //         break;
        //     case 6:
        //         csa.reserve.remove(comment);
        //         break;
        // }
    }
    function resize(_width,_height){
        width = _width;
        height = _height;
        MKCanvas.resize(_width,_height);
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
    }
    function receiveCommentXML(data){
        var cjson = JSON.parse(data);
        var xml = createXML(cjson.data);
        var d = xml.getElementsByTagName('d')[0];
        var opt = d.getAttribute("p").split(",");
        var stime = Math.round(opt[0] * 1000);
        var delay = 0;
        if(stime<time){                                  //在当前帧之前 移动播放轴
          position++;
        }
        else if(stime<time+20){                           //在当前帧中 移动至下一帧
          delay = 20;
        }
        parser.addXML(xml,delay);
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
      csa.clear()
      // csa.scroll.clear();
      // csa.scrollbtm.clear();
      // csa.bottom.clear();
      // csa.top.clear();
      // csa.reserve.clear();
    }
    return{ init, start, stop, timeto, addEventListener, resize, getTime, receiveComment, reset };
});
