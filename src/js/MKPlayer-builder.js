define(['Event','MKPlayer-view','MKPlayer'],function( {playerEvent}, view, player ){
  let container,video_url,comment_url,socket_url,width,height;
  function build({ container: dom, video_url: v_url, comment_url: c_url, socket_url: s_url, width: _width, height:_height }){
    container = dom;
    video_url = v_url;
    comment_url = c_url;
    socket_url = s_url;
    width = _width;
    height = _height;
    let { canvas, video: _video } = view.create({ dom, video_url, width });
    player.create({ canvas, video: _video, comment_url, socket_url });
  }
  return {build}
})
