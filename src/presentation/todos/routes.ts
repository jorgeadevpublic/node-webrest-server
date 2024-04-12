import { Router } from "express";
import { TodoController } from "./controller";

export class TodoRoutes {
	static get routes() {
		const router = Router();
		const todoController = new TodoController();
		
		// is the same as:
		// router.get("/todos", (req, res) => todoController.getTodos(req, res));
		router.get("/", todoController.getTodos);
		router.get("/:id", todoController.getTodo);
		router.post("/", todoController.createTodo);
		router.put("/:id", todoController.updateTodo);
		router.delete("/:id", todoController.deleteTodo);
		
		return router;
	}
}