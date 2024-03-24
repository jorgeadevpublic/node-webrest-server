import { Server } from "./presentation/server";
import { envs } from "./config/envs";

function main() {
	const server = new Server({
		port: envs.PORT,
		publicPath: envs.PUBLIC_PATH,
	});
	server.start();
}

(async () => {
	main();
})();