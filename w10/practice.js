const express = require('express');

const app = express();
app.use(express.json());
const cors = require('cors');

app.use(cors());  
let tasks = [];
let id = 1;

app.get('/tasks', (req,res)=>{
    res.json(tasks);
})


app.post('/tasks', (req,res) => {
    let newtask = { id: id++, text: req.body.text};
    tasks.push(newtask);
    res.json(newtask);
})

app.listen(3000, () => console.log("Server is running"));