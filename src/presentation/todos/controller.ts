import { Request, Response } from "express";

const todos = [
	{ id: 1, text: "Buy milk", done: false, createdAt: new Date()},
	{ id: 2, text: "Buy bread", done: true, createdAt: new Date()},
	{ id: 3, text: "Buy cheese", done: false, createdAt: new Date() },
	{ id: 4, text: "Buy butter", done: true, createdAt: new Date() },
	{ id: 5, text: "Buy eggs", done: false, createdAt: new Date() }
];

export class TodoController {
	constructor() {}
	
	public getTodos = (req: Request, res: Response) => {
		return res.json(todos);
	}
	
	public getTodo = (req: Request, res: Response) => {
		const { id } = req.params;
		const todo = todos.find(todo => todo.id === Number(id));
		if (!todo) {
			return res.status(404).json({ message: "Todo not found" });
		}
		return res.json(todo);
	}
	
	public createTodo = (req: Request, res: Response) => {
		const { text } = req.body;
		if (!text) {
			return res.status(400).json({ message: "Text is required" });
		}
		const newTodo = { id: todos.length + 1, text, done: false, createdAt: new Date() };
		todos.push(newTodo);
		return res.status(201).json(newTodo);
	}
	
	public updateTodo = (req: Request, res: Response) => {
		const { id } = req.params;
		if (!id) {
			return res.status(400).json({ message: "Id is required" });
		}
		const { text, done } = req.body;
		if (!text) {
			return res.status(400).json({ message: "Text is required" });
		}
		if (done === undefined) {
			return res.status(400).json({ message: "Done is required" });
		}
		const todo = todos.find(todo => todo.id === Number(id));
		if (!todo) {
			return res.status(404).json({ message: "Todo not found" });
		}
		todo.text = text;
		todo.done = done;
		return res.json(todo);
	}
	
	public deleteTodo = (req: Request, res: Response) => {
		const { id } = req.params;
		if (!id) {
			return res.status(400).json({ message: "Id is required" });
		}
		const index = todos.findIndex(todo => todo.id === Number(id));
		if (index === -1) {
			return res.status(404).json({ message: "Todo not found" });
		}
		todos.splice(index, 1);
		return res.json({ message: "Todo deleted" });
	}
}