const http = require('http');
const port = 8080;
const iam = require("crypto").randomBytes(5).toString("hex");


let server = http.createServer((req, res) => {
    res.on('close', () => 
        console.log(new Date().toISOString() + " " + res.statusCode + " " + req.url)
    );
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("x-i-am", iam);
	res.end(req.method + " " + req.url + "\n" + JSON.stringify(req.headers, true) + "\n");
}).listen(port, () => {
	console.log(`Listening on ${port}`)
});

function close() {
  console.log('Stopping dummy backend');
  server.close(() =>{
    console.log('Dummy backend stopped');
  });    
}

process.on('SIGINT', close);
process.on('SIGTERM', close);
