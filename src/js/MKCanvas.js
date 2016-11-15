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
    function add(comObj){
        var temp = setDefault(comObj,{
            x:10,
            y:20,
            color:"black",
            opacity:1,
            size:16
        });
        if(temp){
            comments.push(temp);
        }
    }
    function clear(){
        comments = [];
    }
    function setFont(comObj){
        canvas.font = comObj.size +"px"+" sans-serif";      
    }
    var setColor = function(comObj){
        var colorCache = {};
        return function(comObj){
            var color;
            
            if(colorCache[comObj.color]){
                console.log(comObj);
                color = colorCache[comObj.color];
            }
            else{
                color = comObj.color.toString(16);
                color = color.length >= 6 ? color : new Array(6 - color.length + 1).join("0") + color;
                color = "#" + color;
                colorCache[comObj.color] = color;
                console.log("color"+color);
                
            }
            console.log(colorCache);
            canvas.fillStyle = color;
            console.log(canvas.fillStyle);
        }
    }();
    function setAlpha(opacity){
        canvas.globalAlpha = opacity;
    }
    function draw(){
        comments.forEach(function(comObj,index){
            setFont(comObj);
            setColor(comObj);
            canvas.fillText(comObj.text,comObj.x,comObj.y+comObj.size/1.2);
        });
    }
    
    return{
        bind:bind,
        add:add,
        draw:draw,
        setAlpha:setAlpha,
        clear:clear,
        test:function(text){
            console.log(canvas.measureText(text));
        }
    }
});