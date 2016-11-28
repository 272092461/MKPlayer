define(["CommentManager"],function(manager){
    var MKPlayer = document.getElementsByClassName("MKPlayer");
    var video;
    if(MKPlayer.length == 0){
        return;
    }
    build();
    function build(){
        MKPlayer = MKPlayer[0];
        var videoUrl = MKPlayer.getAttribute("video-url");
        var commentUrl = MKPlayer.getAttribute("comment-url");
        var width = MKPlayer.getAttribute("width") | 800;
        var height = MKPlayer.getAttribute("height") | 600;
        
        
        MKPlayer.style.position = "relative";
        
        var fragment = document.createDocumentFragment();
        
        video = buildVideo(videoUrl,width,height);
        video.autoplay = true;
        var canvas = document.createElement("canvas");
        canvas.style.position = "absolute";
        canvas.style.top = 0;
        canvas.style.left = 0;
        
        
        fragment.appendChild(video);
        fragment.appendChild(canvas);
        
        MKPlayer.appendChild(fragment);
       /* video.onresize = function(){
            canvas.width = video.offsetWidth;
            canvas.height = video.offsetHeight;
        }*/
        canvas.width = video.offsetWidth;
        canvas.height = video.offsetHeight;
        
        manager.addEventListener("load",function(){
            manager.start(10);
        });
        manager.init(canvas,commentUrl);
    }
    console.log(video.offsetWidth);
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
    }
    /*manager.addEventListener("load",function(){
        manager.start(10);
    });
    manager.init(document.getElementsByClassName("MKP-canvas")[0],"comment-otsukimi.xml");*/
    return{
        
    }
});