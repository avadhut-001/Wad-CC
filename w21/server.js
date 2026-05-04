const express = require("express");
const mongoose = require("mongoose");

const app = express();

// a) Create DB "bookstore"
mongoose.connect("mongodb://127.0.0.1:27017/bookstore")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

// b) Collection "books"
const bookSchema = new mongoose.Schema({
    Title: String,
    Author: String,
    Price: Number,
    Genre: String
});

const Book = mongoose.model("books", bookSchema);


// ➤ Insert multiple books
app.get("/insert", async (req, res) => {
    await Book.insertMany([
        {Title:"Atomic Habits", Author:"James Clear", Price:500, Genre:"Self-help"},
        {Title:"Rich Dad Poor Dad", Author:"Robert Kiyosaki", Price:400, Genre:"Finance"},
        {Title:"Alchemist", Author:"Paulo Coelho", Price:350, Genre:"Fiction"},
        {Title:"Clean Code", Author:"Robert Martin", Price:700, Genre:"Programming"},
        {Title:"Ikigai", Author:"Hector Garcia", Price:450, Genre:"Self-help"}
    ]);

    res.send("Books Inserted");
});


// ➤ View all books + count (table)
app.get("/books", async (req, res) => {
    const data = await Book.find();
    const count = await Book.countDocuments();

    let html = `<h2>Total Books: ${count}</h2>`;
    html += tableFormat(data);

    res.send(html);
});


// ➤ Add single book (dynamic)
app.get("/add", async (req, res) => {
    await Book.create({
        Title: req.query.title,
        Author: req.query.author,
        Price: req.query.price,
        Genre: req.query.genre
    });

    res.send("Book Added");
});


// ➤ Update book details
app.get("/update/:title", async (req, res) => {
    await Book.updateOne(
        { Title: req.params.title },
        {
            Author: req.query.author,
            Price: req.query.price,
            Genre: req.query.genre
        }
    );

    res.send("Book Updated");
});


// ➤ Delete book
app.get("/delete/:title", async (req, res) => {
    await Book.deleteOne({ Title: req.params.title });
    res.send("Book Deleted");
});


// ➤ Table format
function tableFormat(data){
    let html = `
    <table border="1" cellpadding="10">
    <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Price</th>
        <th>Genre</th>
    </tr>`;

    data.forEach(b => {
        html += `
        <tr>
            <td>${b.Title}</td>
            <td>${b.Author}</td>
            <td>${b.Price}</td>
            <td>${b.Genre}</td>
        </tr>`;
    });

    html += "</table>";
    return html;
}


// Server
app.listen(3000, ()=>{
    console.log("Server running on http://localhost:3000");
});