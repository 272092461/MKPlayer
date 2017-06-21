define(['Event','MKPlayer-view','MKPlayer'],function( {playerEvent}, view, player ){
  let $el,_video_url,_comment_url,_socket_url,_width,_height;
  function build({ el, video_url, comment_url, socket_url, width, height }){
    $el = el;
    _video_url = video_url;
    _comment_url = comment_url;
    _socket_url = socket_url;
    _width = width;
    _height = height;
    let { canvas, video } = view.create({ el, video_url, width });
    player.create({ canvas, video, comment_url, socket_url });
    initListener();
  }
  function initListener(){
    playerEvent.on('turnWindow' , () => view.turnWindow(_width));
  }
  return {build}
})
