var https = require('https');
var fs = require('fs');


var log_stream = fs.createWriteStream('./log/node.log');
process.stdout.write = process.stderr.write = log_stream.write.bind(log_stream);

process.on('uncaughtException', function(err) {
  console.error((err && err.stack) ? err.stack : err);
});


var options = {
  key: fs.readFileSync('ssl/pub'),
  cert: fs.readFileSync('ssl/cert')
};

https.createServer(options, function (req, res) {
  res.writeHead(200);
  res.end("hello world\n");
}).listen(443);
