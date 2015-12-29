var fs = require('fs');
var path = require('path');
var files = {};

module.exports = function(req, res) {

  var sendError = function(message, code) {
    res.writeHead(code || 404, {'Content-Type': 'text/html'});
    res.end(message);
  }

  var serve = function(file) {
    var contentType;
    switch(file.ext) {
      case "css": contentType = "text/css"; break;
      case "html": contentType = "text/html"; break;
      case "js": contentType = "application/javascript"; break;
      case "ico": contentType = "image/ico"; break;
      case "json": contentType = "application/json"; break;
      case "jpg": contentType = "image/jpeg"; break;
      case "jpeg": contentType = "image/jpeg"; break;
      case "png": contentType = "image/png"; break;
      case "ttf": contentType = "application/x-font-ttf"; break;
      case "woff": contentType = "application/x-font-woff"; break;
      case "svg": contentType = "image/svg+xml"; break;
      default: contentType = "text/plain";
    }
    res.writeHead(200, {'Content-Type': contentType});
    res.end(file.content + '\n');
  }

  var readFile = function(filePath) {
    fs.exists(filePath, function(exists) {
      if(exists && files[filePath] && false) {
          serve(files[filePath]);
      } else if(exists) {
        fs.readFile(filePath, function(err, data) {
          if(err) {
            sendError('Error reading ' + filePath + '.');
            return;
          }
          files[filePath] = {
            ext: filePath.split(".").pop().toLowerCase(),
            content: data
          };
          serve(files[filePath]);
        });
      } else {
        sendError('File ' + req.url + ' does not exist.')
      }
    });
  }
  console.log('will read ' + __dirname + '/..' + req.url);
  readFile(path.normalize(__dirname + '/..' + req.url));

}