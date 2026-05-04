const express = require('express');
const app = express();
app.use(express.json());

let tasks = [];
let id = 1;

// Get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Add task
app.post('/tasks', (req, res) => {
    let newTask = { id: id++, text: req.body.text };
    tasks.push(newTask);
    res.json(newTask);
});

// Delete task
app.delete('/tasks/:id', (req, res) => {
    tasks = tasks.filter(t => t.id != req.params.id);
    res.send("Deleted");
});

app.listen(3000, () => console.log("Server running on port 3000"));