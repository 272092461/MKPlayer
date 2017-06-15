define(function(){
    function create(){
        var pools = [];
        var width;
        var height;
        var avoid = 10;
        function init(_width,_height,_canvas){
            width = _width;
            height = _height;
        }
        function add(comment){
            comment.y = assign(comment);
            binInsert(comment,pools[comment.pindex]);                          /*二分插入弹幕池*/
        }
        function binInsert(comment,pool){
            if(pool.length == 0){
                pool.push(comment);
            }
            else if(comment.bottom<=pool[0].bottom){
                pool.unshift(comment);
            }
            else if(comment.bottom>=pool[pool.length-1].bottom){
                pool.push(comment);
            }
            else{
                var find = false;
                var start = 0;
                var stop = pool.length;
                var position;
                while(!find){
                    position = start + parseInt((stop-start)/2);
                    if(pool[position-1].bottom<=comment.bottom && pool[position].bottom>=comment.bottom){
                        find = true;
                        pool.splice(position,0,comment);

                    }
                    else if(pool[position].bottom>comment.bottom){
                        stop = position;
                    }
                    else{
                        start = position+1;
                    }
                }
            }
        }
        function willCollide(existed,comment){
            return existed.endTime >= comment.arriveTime || existed.outTime >= comment.stime;
        }
        function pathCheck(y,comment,pool){
            var bottom = y+comment.height;
            var right = comment.right;
            for(var i = 0;i < pool.length;i++){
                if(pool[i].y > bottom){
                    break;
                }
                if(pool[i].bottom < y){
                    continue;
                }
                else{
                    if(comment.x == "middle"){
                            return false;
                    }
                    if(willCollide(pool[i], comment)) {
                            return false;
                    }
                   /* if(willCollide(pool[i], comment)) {
                            return false;
                    }
                    if(comment.x == "middle"){
                        return false;
                    }*/
                }
            }
            return true;
        }
        function assign(comment){
            if(comment.pindex === undefined){
                comment.pindex = 0;
            }
            if(pools[comment.pindex] === undefined){
                for(var i = 0;i <= comment.pindex;i++){
                    pools[i] = pools[i] === undefined ? []:pools[i];
                }
            }
            var flag = false;
            var pindex = comment.pindex;
            var y;
            while(!flag){
                var pool = pools[pindex];
                if(pool.length == 0){
                    y = 0;
                    comment.pindex = pindex;
                    pool.push({height:0,bottom:0,x:0,y:0,right:0});
                    return 0;
                }
                for(var i = 0;i<pool.length;i++){
                    y = pool[i].bottom + avoid;
                    if(y+comment.height < height){
                        if(pathCheck(y,comment,pool)){
                            comment.pindex = pindex;
                            return y;
                        }
                    }
                    else{
                        break;
                    }
                }
                pindex++;
                if(pools[pindex] === undefined){
                    pools.push([]);
                }
            }
        }
        function remove(comment){
            var pool = pools[comment.pindex];
            if(pool){
                var index = pool.indexOf(comment)
                if(index != -1){
                    pool.splice(index,1);
                }
            }
        }
        function clear(){
            pools = [];
        }
        function resize(_width,_height){
            width = _width;
            height = _height;
        }
        function setAvoid(_avoid){
          avoid = _avoid;
        }
        return {
            init:init,
            add:add,
            resize:resize,
            remove:remove,
            setAvoid:setAvoid,
            clear:clear
        };
    }
    return{
        create:create
    };
});
