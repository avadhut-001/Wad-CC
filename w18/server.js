const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// a) Create DB "music" (MongoDB auto-creates it)
mongoose.connect("mongodb://127.0.0.1:27017/music")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

// b) Create Collection "songdetails"
const songSchema = new mongoose.Schema({
    Songname: String,
    Film: String,
    Music_director: String,
    singer: String,
    Actor: String,
    Actress: String
});

const Song = mongoose.model("songdetails", songSchema);

// c) Insert 5 songs
app.get("/insert", async (req, res) => {
    await Song.insertMany([
        {Songname:"Tum Hi Ho", Film:"Aashiqui 2", Music_director:"Mithoon", singer:"Arijit Singh"},
        {Songname:"Kesariya", Film:"Brahmastra", Music_director:"Pritam", singer:"Arijit Singh"},
        {Songname:"Kal Ho Na Ho", Film:"KHNH", Music_director:"Shankar", singer:"Sonu Nigam"},
        {Songname:"Malang", Film:"Malang", Music_director:"Mithoon", singer:"Ved Sharma"},
        {Songname:"Ghungroo", Film:"War", Music_director:"Vishal", singer:"Arijit Singh"}
    ]);
    res.send("5 Songs Inserted");
});

// d) Count + display all
app.get("/songs", async (req, res) => {
    const songs = await Song.find();
    const count = await Song.countDocuments();

    let html = `<h2>Total Songs: ${count}</h2>`;
    html += tableFormat(songs);

    res.send(html);
});

// e) Songs by Music Director
app.get("/director/:name", async (req, res) => {
    const songs = await Song.find({Music_director: req.params.name});
    res.send(tableFormat(songs));
});

// f) Songs by Director & Singer

//http://localhost:3000/director/Shankar/Singer/Sonu%20Nigam
app.get("/director/:name/singer/:singer", async (req, res) => {
    const songs = await Song.find({
        Music_director: req.params.name,
        singer: req.params.singer
    });
    res.send(tableFormat(songs));
});

// g) Delete song
app.get("/delete/:name", async (req, res) => {
    await Song.deleteOne({Songname: req.params.name});
    res.send("Song Deleted");
});

// h) Add new favourite song
app.get('/add', async(req,res)=>{
    await song.insertOne({
        Songname: req.query.song,
        Film: req.query.film,
        Music_D: req.query.md,
        Singer: req.query.singer,
    })
    res.send("song added.");
})

// i) Songs by Singer + Film
app.get("/filter", async (req, res) => {
    const songs = await Song.find({
        singer: "Arijit Singh",
        Film: "Brahmastra"
    });
    res.send(tableFormat(songs));
});
//OR
app.get('/Singer/:sname/Film/:fname', async (req,res)=>{
    const songs = await song.find({
        Singer: req.params.sname,
        Film: req.params.fname,

    })
    res.send(tableFormat(songs));
})


// j) Update (add Actor & Actress)
app.get("/update", async (req, res) => {
    await Song.updateOne(
        { Songname: req.query.song },
        {
            Actor: req.query.actor,
            Actress: req.query.actress
        }
    );
    res.send("Song updated successfully");
});

// k) Table Format Function
function tableFormat(data) {
    let html = `
    <table border="1" cellpadding="10">
    <tr>
        <th>Song Name</th>
        <th>Film</th>
        <th>Music Director</th>
        <th>Singer</th>
        <th>Actor</th>
        <th>Actress</th>
    </tr>`;

    data.forEach(s => {
        html += `
        <tr>
            <td>${s.Songname}</td>
            <td>${s.Film}</td>
            <td>${s.Music_director}</td>
            <td>${s.singer}</td>
            <td>${s.Actor || ""}</td>
            <td>${s.Actress || ""}</td>
        </tr>`;
    });

    html += "</table>";
    return html;
}

// Server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});