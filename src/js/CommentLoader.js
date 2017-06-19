define(function(){
    var xmlhttp = XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
    function load(url,callback){
        xmlhttp.open("GET",url,true);
        xmlhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                callback(this.responseXML);
            }
        }
        xmlhttp.send();
    }
    return { load };
});
