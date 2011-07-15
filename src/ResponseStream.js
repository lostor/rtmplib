exports.ResponseStream = ResponseStream;

function ResponseStream(socket)
{
	this.socket = socket;
}

ResponseStream.prototype.send = function(data)
{
	this.socket.write(data, "binary");
}