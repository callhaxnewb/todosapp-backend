const express = require('express');
const app = express();

app.use(express.json({ limit: "4kb" }));

let todos = [
    "Cricket", "Dance", "Sing", "Coding"
];

app.get('/api/todos', (req, res) => {
    res.json(todos);
});

app.post('/api/todos', (req, res) => {
    const newTodo = req.body.todo;
    if (newTodo) {
        todos.push(newTodo);
        res.status(201).json({ message: 'Todo added successfully', todos });
    } else {
        res.status(400).json({ error: 'Todo is required' });
    }
});

app.delete('/api/todos/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < todos.length) {
        const deletedTodo = todos.splice(index, 1);
        res.json({ message: 'Todo deleted successfully', deletedTodo, todos });
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});

app.put('/api/todos/:index', (req, res) => {
    const index = parseInt(req.params.index);
    const updatedTodo = req.body.todo;
    if (index >= 0 && index < todos.length && updatedTodo) {
        todos[index] = updatedTodo;
        res.json({ message: 'Todo updated successfully', todos });
    } else {
        res.status(404).json({ error: 'Todo not found or invalid update' });
    }
});

module.exports = app;