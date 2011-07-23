exports.ByteBuffer = ByteBuffer;

function ByteBuffer()
{
	this.buffer = '';
}

ByteBuffer.prototype.append = function(data)
{
	this.buffer += data;
}

ByteBuffer.prototype.readByte = function()
{
	b = this.buffer.charCodeAt(0);
	this.buffer = this.buffer.slice(1);
	return b;
}

ByteBuffer.prototype.read = function(count)
{
	b = this.buffer.slice(0, count);
	this.buffer = this.buffer.slice(count);
	return b;
}

ByteBuffer.prototype.count = function()
{
	return this.buffer.length;
}