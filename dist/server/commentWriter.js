var fs = require('fs');
var xmlParser = require('xmldom').DOMParser;
function create(root){
  root = root === undefined ? "./" : root;
  var xmlcache = {};
  var maxCahche = 50;
  function write(comment,file){
    var path = root + file;
    if(file in xmlcache){
        writeXML(comment,file);
    }
    else{
      fs.readFile(path,'utf-8',function(err,data){
        if(err) throw err;
        xmlcache[file] = new xmlParser().parseFromString(data,'text/xml');
        writeXML(comment,file);
      });
    }
  }

  function writeXML(comment,file){
    var cXml = new xmlParser().parseFromString(comment+'\n','text/xml');
    var i = xmlcache[file].getElementsByTagName('i')[0];
    i.appendChild(cXml.getElementsByTagName('d')[0]);
    var r = xmlcache[file].createTextNode('\r\n');
    i.appendChild(r);
    fs.writeFile(root+file,xmlcache[file],function(err){
        if(err) throw err;
        console.log('has finished');
    });
  }
  return {write:write};
}

module.exports = create;
