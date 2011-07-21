var net = require('net');
 
 
var server = net.createServer(function (stream) {
    stream.setEncoding('utf8');
 
    stream.addListener('connect', function () {
        console.log("Connect!");
    });
 
    stream.addListener('data', function (data) {
        console.log(data.toString('ascii'));
    });
 
    stream.addListener('end', function () {
        console.log("Disconnect!");
        stream.end();
    });
});

server.listen(1935, "127.0.0.1");
console.log("Started...");