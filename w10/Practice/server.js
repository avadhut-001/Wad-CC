const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let todos = []; // simple in-memory storage

// Get all tasks
app.get("/todos", (req, res) => {
    res.json(todos);
});

// Add new task
app.post("/todos", (req, res) => {
    const newTodo = {
        id: Date.now(),
        text: req.body.text
    };
    todos.push(newTodo);
    res.json(newTodo);
});

// Update task
app.put("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.map(todo =>
        todo.id === id ? { ...todo, text: req.body.text } : todo
    );
    res.json({ message: "Updated" });
});

// Delete task
app.delete("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter(todo => todo.id !== id);
    res.json({ message: "Deleted" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));