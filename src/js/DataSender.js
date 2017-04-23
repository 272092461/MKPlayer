define(["MKSocket","CommentManager"],function(socket,manager){
    var uid = new Date().getTime()+""+Math.floor(Math.random()*899+100);    //随机生成uid
    function send(comment,id){
        socket.send(
            JSON.stringify({
                id:id|uid,
                data:transfer(comment,id)
            })
        );
    }
    function transfer(comment,id){
        var data;
        /* -----------xml转换-----------*/
        id = id | uid;
        data = '<d p="'+comment.stime+","+comment.mode+","+comment.size+","+comment.color+
        ","+comment.date+","+comment.pool+","+id+","+ '249678149">'+comment.text+
        '</d>';
        return data;
    }
    return{
        send:send
    };
});
