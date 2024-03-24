import http2 from 'http2';
import fs from "fs";

const server = http2.createSecureServer({
	key: fs.readFileSync("./keys/server.key"),
	cert: fs.readFileSync("./keys/server.crt")
},(req, res) => {
	
	console.log(`Request URL: ${ req.url }`);
	
	if (req.url === "/") {
		const htmlFile = fs.readFileSync("./public/index.html", "utf-8");
		res.setHeader("Content-Type", "text/html");
		res.write(htmlFile);
		res.end();
	}
	
	if (req.url?.endsWith(".js")) {
		res.writeHead(200, { "Content-Type": "application/javascript" });
	} else if (req.url?.endsWith(".css")) {
		res.writeHead(200, { "Content-Type": "text/css" });
	}
	
	try {
		const responseContent = fs.readFileSync(`./public${ req.url }`, "utf-8");
		res.write(responseContent);
		res.end();
	} catch (error) {
		console.log(error);
		res.writeHead(404, { "Content-Type": "text/html" });
		res.write("<h1>404 Not Found</h1>");
		res.end();
	
	}
});

server.listen(3000, () => {
	console.log('Server is listening on port 3000');
});