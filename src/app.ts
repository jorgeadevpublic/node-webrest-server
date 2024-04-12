import { Server } from "./presentation/server";
import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes";

async function main() {
	const server = new Server({
		port: envs.PORT,
		publicPath: envs.PUBLIC_PATH,
		routes: AppRoutes.routes
	});
	await server.start();
}

(async () => {
	await main();
})();