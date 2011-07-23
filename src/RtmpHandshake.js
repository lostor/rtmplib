exports.RtmpHandshake = RtmpHandshake;

var ByteBuffer = require("./ByteBuffer").ByteBuffer;

function RtmpHandshake()
{
	this.C0 = false;
	this.C1 = false;
	this.isAcknowledged = false;
}

RtmpHandshake.prototype.processRequest = function(buffer)
{
	if(!this.C0)
	{
		if(3 != buffer.readByte())
		{
			throw new Error('Unexpected version, Only version 3 is supported');
		}
		this.C0 = true;
		response = this.buildS0S1Response();
		console.log("C0")
		return response;
	}
	
	if(!this.C1)
	{
		if(buffer.count()<1536)
			return;
		
		timestampC1 = buffer.read(4);
		zero = buffer.read(4);
		random = buffer.read(1528);
		
		console.log(timestampC1);
		console.log(zero);
	}
}


RtmpHandshake.prototype.buildS0S1Response = function()
{
	timestamp = '\0\0\0\0';
	zero = '\0\0\0\0';
	random = '';
	for( var i = 0; i < 1528; i++ ){
		 random += String.fromCharCode( Math.round( 255 * Math.random() ) );
	}
	return '\3' + timestamp + zero + random;
}

RtmpHandshake.prototype.buildS2Response = function(timestampC1, timestampS1)
{
	for( var i = 0; i < 1528; i++ ){
		 random += String.fromCharCode( Math.round( 255 * Math.random() ) );
	}
	return timestampC1 + timestampS1 + random;
}