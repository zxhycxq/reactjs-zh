var http = require('http');
server = http.createServer(function (req, res) {
    res.writeHeader(200, {"Content-Type": "text/plain"});
    res.end("Hello World！");
});
server.listen(7070);
console.log("httpd start @7070");
