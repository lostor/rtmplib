exports.RequestStream = RequestStream;

function RequestStream(buffer)
{
	this.buffer = buffer;
}

RequestStream.prototype.readByte = function()
{
	if(this.buffer.length == 0)
	{
		throw new Error("Count available items in the buffer less than is requested.");
	}
	result = this.buffer[0];
	this.buffer = this.buffer.slice(1);
	return result;
}

RequestStream.prototype.read = function(count)
{
	if(this.buffer.length < count) 
	{
		throw new Error("Count available items in the buffer less than is requested.");
	}
	result = this.buffer.slice(0, count);
	this.buffer = this.buffer.slice(count);
	return result;
}

RequestStream.prototype.readAll = function()
{
	result = this.buffer;
	this.buffer = "";
	return result;
}

RequestStream.prototype.available = function()
{
	return this.buffer.length;
}

RequestStream.prototype.append = function(data)
{
	this.buffer += data;
}