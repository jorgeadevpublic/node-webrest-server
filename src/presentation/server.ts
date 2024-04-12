import express, { Router } from "express";
import path from "path";

interface Options {
	port: number;
	routes: Router;
	publicPath?: string;
}

export class Server {
	private app = express();
	private readonly port: number;
	private readonly publicPath: string;
	private readonly routes: Router;
	
	constructor(private options: Options) {
		const { port, publicPath = "public", routes } = options;
		this.port = port;
		this.publicPath = publicPath;
		this.routes = routes;
	}
	
	async start() {
		/* middleware */
		// raw
		this.app.use(express.json());
		// x-www-form-urlencoded
		this.app.use(express.urlencoded({ extended: true }));
		
		/* public folder */
		this.app.use(express.static(this.publicPath));
		
		/* routes */
		this.app.use("/api", this.routes);
		
		/* single page application */
		this.app.get("*", (req, res) => {
			const indexPath = path.join(__dirname + `../../../${ this.publicPath }/index.html`);
			res.sendFile(indexPath);
			return;
		});
		
		this.app.listen(this.port, () => {
			console.log(`Server is listening on port ${ this.port }`);
		});
	}
}