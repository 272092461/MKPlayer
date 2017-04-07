define(["MKCanvas","CommentSpaceAllocator","CommentLoader","CommentParser","CommentBuilder","CommentManager","MKPlayer","MKPlayer-view","ControlBar"],function(MKCanvas,comment,loader,parser,builder,manager,player,view,bar){
    /*    MKCanvas.bind(document.getElementsByClassName("MKP-canvas")[0]);                      //MKCanvas test
    MKCanvas.add([{
        text:"2333",
        x:"middle",
        y:1,
        align_x:"middle",
        align_y:30,
        height:25,
        color:13311,
        size:25
    },{
        text:"陈333",
        x:30,
        y:30,
        align_x:30,
        align_y:30,
        height:25,
        color:16777215,
        size:25
        
    }])
    
    
    MKCanvas.draw();
    MKCanvas.getWidth("2333");*/
    
    /*var scrollcomment = comment.create();                                             //commentAllocation test
    var corecomment = comment.create();
    scrollcomment.init(800,500);
    for(var i = 0;i<2;i++){
        scrollcomment.add({text:666,height:16,y:0,get bottom(){return this.height+this.y;},stime:666,ttl:666});
    }
    var a = {text:11,height:16,y:0,get bottom(){return this.height+this.y;},stime:666,ttl:666};
    scrollcomment.add(a);
    scrollcomment.render();
    corecomment.init(800,500);
    corecomment.add(a);
    corecomment.render();*/
    
    
    /*loader.load("comment-science.xml",function(xml){                                  //loader and parser test
        console.log(xml);
        parser.create(xml);
    });*/
    
   /* loader.load("comment-science.xml",function(xml){                                  
        //loader  parser  builder test;
        builder.init({height:500,
                     width:800,
                     });
        var runline = [];
        var clist = parser.create(xml);
        for(var i = 0;i<clist.length;i++){
            var cmt = builder.builder(clist[i]);
            if(cmt.stime == 0){
                runline.push(cmt);
            }
        }
        var scrollcomment = comment.create();                                             //commentAllocation test
        scrollcomment.init(800,500);
        for(i = 0;i<runline.length;i++){
            scrollcomment.add(runline[i]);
        }
        
        for(i = 0;i<runline.length;i++){
            runline[i].align = 3;
            console.log(runline[i].align_y + " " +runline[i].y);
        }
    });*/
    
    var MKPlayer = document.getElementsByClassName("MKPlayer");
    var video;
    if(!MKPlayer.length){
        return;
    }
    view.build(MKPlayer[0]);
    /*function build(){
        MKPlayer = MKPlayer[0];
        var videoUrl = MKPlayer.getAttribute("video-url");
        var commentUrl = MKPlayer.getAttribute("comment-url");
        var width = MKPlayer.getAttribute("width") | 800;
        var height = MKPlayer.getAttribute("height") | 600;
        
        
        var fragment = document.createElement("div");
        
        video = buildVideo(videoUrl,width,height);
        video.autoplay = true;
        var canvas = document.createElement("canvas");
        canvas.className="comment-canvas";
        
        
        fragment.appendChild(video);
        fragment.appendChild(canvas);
        fragment.className = "player-body";
        MKPlayer.appendChild(fragment);
        video.onresize = function(){
            canvas.width = video.offsetWidth;
            canvas.height = video.offsetHeight;
        }
        canvas.width = video.offsetWidth;
        canvas.height = video.offsetHeight;
        manager.addEventListener("load",function(){
            manager.start(10);
            manager.timeto(10000);
        });
        manager.init(canvas,commentUrl);
        player.addEventListener("load",function(){
            player.start(10);
            player.timeto(50);
        });
        player.init(video,canvas,commentUrl);
    }
    function buildVideo(url,width,height){
        url = url.split(";");
        var video = document.createElement("video");
        for(var i = 0; i < url.length;i++){
            var source = document.createElement("source");
            source.setAttribute("src",url[i]);
            var type = url[i].split(".");
            switch(type[type.length-1]){
                case "mp4":{
                    source.setAttribute("type","video/mp4");
                    break;
                }
                case "webm":{
                    source.setAttribute("type","video/webm");
                    break;
                }
                case "ogg":{
                    source.setAttribute("type","video/ogg");
                    break;
                }
            }
            video.appendChild(source);
        }
        video.width = width;
        video.height = height;
        return video;
    }*/
    /*manager.test(document.getElementsByClassName("MKP-canvas")[0],"comment-otsukimi.xml");*/
    return{};
});