exports.RtmpConnection = RtmpConnection;

function RtmpConnection(socket)
{
	socket.addListener("data", function(data){
		console.log(data.toString("ascii"));
	});
	
	socket.addListener("connect", function(){
		console.log("socket:connect");
	});
	
	socket.addListener( 'end', function(){
		console.log("socket:end");
	socket.end();
	});


}