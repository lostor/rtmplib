exports.RtmpConnection = RtmpConnection;

var ByteBuffer = require("./ByteBuffer").ByteBuffer;
var RtmpHandshake = require("./RtmpHandshake").RtmpHandshake;

var ResponseStream = require("./ResponseStream").ResponseStream;
var RequestStream = require("./RequestStream").RequestStream;

function RtmpConnection(socket)
{
	socket.setEncoding("binary");
	this.socket = socket;
	//this.handshake = null;
	//this.buffer = new ByteBuffer();
	var handler = this;
	
	this.response = new ResponseStream(socket);
	this.request = new RequestStream("");
	
	socket.addListener("data", function(data)
	{
		handler.onDataReceived(data);
	});
	
	socket.addListener("connect", function()
	{
		console.log("socket:connect");
	});
	
	socket.addListener("end", function()
	{
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
	this.request.append(data);
	
	this.process1(this.request, this.response);
/*
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
*/
}

RtmpConnection.prototype.process1 = function(request1, response1)
{
	response1.send(request1.readAll());
}