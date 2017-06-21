define(["MKPlayer-view","MKPlayer-builder"],function(view,builder){
    // var MKPlayer = document.getElementsByClassName("MKPlayer");
    // var video;
    // if(!MKPlayer.length){
    //     return;
    // }
    // view.build(MKPlayer[0]);
    var el = document.createElement('div');
    document.body.appendChild(el);

    builder.build({
      el:el,
      video_url: 'static/crayon_937.mp4',
      comment_url: 'static/comment-otsukimi.xml',
      socket_url: 'ws://127.0.0.1:8080/comment-otsukimi.xml',
      width: 640
    });
    return{};
});
