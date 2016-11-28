define(["MKCanvas","CommentSpaceAllocator","CommentLoader","CommentParser","CommentBuilder"],function(MKCanvas,comment,loader,parser,builder){
    var video;
    var canvas;
    var _listener = {};
    var timeline;
    var runline = [];
    var timer;
    var width;
    var height;
    var time = 0;
    var position = 0;
    var csa = {};
    csa.init = function(_width,_height){
        for(var name in this){
            if(this[name]["init"]){
                this[name]["init"](_width,_height);
            }
        }
    }
    function init(_canvas,_url){
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
            dispatchEvent("load");
        }); 
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
            start(10);
        }); 
    }
    function start(interTime){
        if(timer == null){
            timer = setInterval(function(){
                move(interTime);
                run(interTime);
                draw();
                time+=interTime;
            },interTime | 10);
        }
    }
    function run(interTime){
        while(timeline[position] && timeline[position].stime < time + interTime){
            send(timeline[position]);
            position++;
        }
    }
    function stop(){
        
    }
    function timeto(){
        
    }
    function move(time){
        for(var i = 0;i<runline.length;i++){
            runline[i].time(time);
        }
    }
    function draw(){
        if(runline.length == 0){
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
    function rescale(){
        width = video.style.offsetWidth;
        height = video.style.offsetHeight;
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
    return{
        init:init,
        start:start,
        stop:stop,
        timeto:timeto,
        addEventListener:addEventListener,
        test:test
    };
});