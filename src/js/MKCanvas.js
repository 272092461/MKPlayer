define(function(){
    var canvas;
    var comments = [];
    var globalAlpha = 1;
    function bind(obj){
        obj = obj.getContext ?obj.getContext("2d") : obj;
        if(obj instanceof CanvasRenderingContext2D){
            canvas = obj;
        }
        else{
            console.error("canvas binding error");
        }
    }
    function setDefault(comObj,def){
        var temp = {};
        if(comObj["text"]){
            temp["text"] = comObj["text"];
        }
        else{
            return;
        }
        for(var name in def){
            temp[name] = comObj[name] == null ? def[name] : comObj[name];
        }

        return temp;
    }
/**
 * comObj
 * @property text 文本
 * @property x    位置
 * @property y
 * @property color 颜色
 * @property opacity 透明度
 * @property size 字体大小
*/
    function add(_comments){
        comments = _comments;
    }
    function clear(){
        comments = [];
        canvas.clearRect(0,0,canvas.canvas.width,canvas.canvas.height);
        setFont({size:null});
    }
    function remove(comment){
        var p = comments.indexOf(comment);
        if(p!= -1){
            comments.splice(p,1);
        }
    }
    /*function setFont(comObj){
        canvas.font ="bold " + comObj.size +"px"+" sans-serif";
    }*/
    var setFont = function(){
        var size;
        return function(comObj){
            if(size != comObj.size){
                size = comObj.size;
                canvas.font = size +"px"+" Microsoft YaHei"; 
            }
        }
    }();
    var setColor = function(comObj){
        var colorCache = {};
        return function(comObj){
            var color;

            if(colorCache[comObj.color]){
                color = colorCache[comObj.color];
            }
            else{
                color = comObj.color.toString(16);
                color = color.length >= 6 ? color : new Array(6 - color.length + 1).join("0") + color;
                color = "#" + color;
                colorCache[comObj.color] = color;

            }
            canvas.fillStyle = color;
        }
    }();
    function setAlpha(opacity){
        canvas.globalAlpha = opacity;
    }
    function draw(){
        comments.forEach(function(comObj,index){

            setFont(comObj);
            setColor(comObj);
            var x = comObj.align_x;
            if(x === "middle"){
                x = canvas.canvas.width/2;
                canvas.textAlign = "center";
            }
            else{
                canvas.textAlign = "start"
            }
            canvas.fillText(comObj.text,x,comObj.align_y+comObj.height);
        });
    }
    function getWidth(comment){
        if(!canvas){
            canvas = document.createElement("canvas").getContext("2d");
        }
        setFont(comment);
        return canvas.measureText(comment.text).width;
    }
    return{
        bind:bind,
        add:add,
        draw:draw,
        setAlpha:setAlpha,
        clear:clear,
        getWidth:getWidth
    }
});
