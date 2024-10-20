const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo')
const PORT = 3001;

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/test');

app.get('/get', (req, res) => {
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    
    // Find the todo by id and toggle the done state
    TodoModel.findById(id)
        .then(todo => {
            if (todo) {
                todo.done = !todo.done;
                todo.save()
                    .then(updatedTodo => res.json(updatedTodo))
                    .catch(err => res.status(500).json(err));
            } else {
                res.status(404).json({ message: "Todo not found" });
            }
        })
        .catch(err => res.status(500).json(err));
});


app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task:task
    }).then(result => res.json(result))
    .catch(err => res.json(err));
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
});