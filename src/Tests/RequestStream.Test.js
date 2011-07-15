var RequestStream = require("../RequestStream").RequestStream;

// [init]
var stream = new RequestStream("abc123!");

// [test] available()
if(stream.available() != 7) throw new Error("Expected: available() == 8");

// [test] readByte
if(stream.readByte() != "a") throw new Error("Expected: readByte() == 'a'");

// [test] read(3)
if(stream.read(3) != "bc1") throw new Error("Expected: read(3) == 'bc1'");

// [test] readAll()
if(stream.readAll() != "23!") throw new Error("Expected: readAll() == '23'");

// [test] available()
if(stream.available() != 0) throw new Error("Expected: available() == 0");

// [act]
stream.append("zx");
stream.append("cv");
// [test] available()
if(stream.available() != 4) throw new Error("Expected: available() == 4");
// [test] read(4)
if(stream.read(4) != "zxcv") throw new Error("Expected: read(4) == 'zxcv'");
// [test] available()
if(stream.available() != 0) throw new Error("Expected: available() == 0");

console.log("Test OK!");