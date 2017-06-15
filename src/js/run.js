define(["MKCanvas","CommentSpaceAllocator","CommentLoader","CommentParser","CommentBuilder","CommentManager","MKPlayer","MKPlayer-view","ControlBar"],function(MKCanvas,comment,loader,parser,builder,manager,player,view,bar){
    var MKPlayer = document.getElementsByClassName("MKPlayer");
    var video;
    if(!MKPlayer.length){
        return;
    }
    view.build(MKPlayer[0]);
    return{};
});
