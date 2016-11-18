define(["MKCanvas","commentSpaceAllocator","CommentLoader","CommentParser","CommentBuilder"],function(MKCanvas,comment,loader,parser,builder){
   /* MKCanvas.bind(document.getElementsByClassName("MKP-canvas")[0]);                      //MKCanvas test
    MKCanvas.add({
        text:"2333",
        x:30,
        y:1,
        color:13311,
        size:25
    })
    
    MKCanvas.add({
        text:"陈333",
        x:30,
        y:26,
        color:16777215,
        size:25
        
    })
    
    MKCanvas.draw();
    MKCanvas.test("2333");*/
    
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
    
    loader.load("comment-science.xml",function(xml){                                  
        //loader  parser  builder test
        console.log(xml);
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
            console.log(runline[i].y);
        }
    });
    
    return{};
});