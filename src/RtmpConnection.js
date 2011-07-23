exports.RtmpConnection = RtmpConnection;

var ByteBuffer = require("./ByteBuffer").ByteBuffer;
var RtmpHandshake = require("./RtmpHandshake").RtmpHandshake;

function RtmpConnection(socket)
{
	socket.setEncoding("binary");
	this.socket = socket;
	this.handshake = null;
	this.buffer = new ByteBuffer();
	
	var handler = this;
	
	socket.addListener("data", function(data){
		//console.log(data.toString("ascii"));
		handler.onDataReceived(data);
	});
	
	socket.addListener("connect", function(){
		console.log("socket:connect");
	});
	
	socket.addListener("end", function(){
		console.log("socket:end");
	socket.end();
	});
}

RtmpConnection.prototype.send = function(data)
{
	return this.socket.write(data, "binary");
}

/* Handlers */
RtmpConnection.prototype.onDataReceived = function(data)
{
	this.buffer.append(data);
	
	if(!this.handshake)
	{
		this.handshake = new RtmpHandshake();
	}
	
	if(!this.handshake.isAcknowledged)
	{
		response = this.handshake.processRequest(this.buffer)
		return this.send(response);
	}
}