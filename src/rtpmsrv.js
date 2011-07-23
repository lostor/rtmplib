var net = require("net");
var RtmpConnection = require("./RtmpConnection").RtmpConnection;
 
var server = net.createServer();

server.addListener("connection", function (socket) {
	try
	{
		console.log("server:connection");
		new RtmpConnection(socket);
	}		
	catch( error )
	{
		console.log("Error: "+error.message );
	}
});

server.addListener("close", function(errno) {
	console.log("server:close "+errno);
} );

server.listen(1935, "127.0.0.1");
console.log("Started...");