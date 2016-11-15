define(function(){
    var clist = [];
    function create(xml){
        "use strict";
        var ds = xml.getElementsByTagName("d");
        var d;
        for(var i = 0;i<ds.length;i++){
            d = ds[i];
            if(!d.childNodes[0])
			  continue;
            var obj = {};
            var opt = d.getAttribute("p").split(",");
            obj.stime = Math.round(opt[0]*1000);
            obj.mode = parseInt(opt[1]);
            obj.size = parseInt(opt[2]);
            obj.color = parseInt(opt[3]);
            obj.date = parseInt(opt[4]);
			obj.pool = parseInt(opt[5]);
            if(opt[7] != null)
				obj.dbid = parseInt(opt[7]);
			obj.hash = opt[6];
            obj.text = d.childNodes[0].nodeValue.replace(/(\/n|\\n|\n|\r\n)/g, "\n")
            add(obj);
        }
        console.log(clist);
        return clist;
    }
    function binInsert(comment,arr){
        if(arr.length == 0){
            arr.push(comment);
        }
        else if(comment.stime<=arr[0].stime){
            arr.unshift(comment);
        }
        else if(comment.stime>=arr[arr.length-1].stime){
            arr.push(comment);
        }
        else{
            var find = false;
            var start = 0;
            var stop =arr.length;
            var position;
            while(!find){
                position = start + parseInt((stop-start)/2);
                if(arr[position-1].stime<=comment.stime && arr[position].stime>=comment.stime){
                    find = true;
                    arr.splice(position,0,comment);
                    
                }
                else if(arr[position].stime>comment.stime){
                    stop = position;
                }
                else{
                    start = position+1;
                }
            }
        }
    }
    function add(comment){
        
        binInsert(comment,clist);
    }
    return{
        create:create,
        add:add
    };
});