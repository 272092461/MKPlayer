define(["MKSocket","CommentManager"],function(socket,manager){
    function send(id,comment){
        manager.send(comment);
        socket.send(
            JSON.stringify({
                id:id,
                data:transfer(comment)
            })
        );
    }
    function transfer(comment){
        var data;
        /* -----------xml转换-----------*/

        return data;
    }
    return{
        send:send
    };
});
