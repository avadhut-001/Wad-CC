const express = require("express");
const mongoose = require("mongoose");

const app = express();

// a) Create DB "student"
mongoose.connect("mongodb://127.0.0.1:27017/student")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

// b) Collection "studentmarks"
const studentSchema = new mongoose.Schema({
    Name: String,
    Roll_No: Number,
    WAD_Marks: Number,
    CC_Marks: Number,
    DSBDA_Marks: Number,
    CNS_Marks: Number,
    AI_Marks: Number
});

const Student = mongoose.model("studentmarks", studentSchema);


// c) Insert multiple students
app.get("/insert", async (req, res) => {
    await Student.insertMany([
        {Name:"ABC", Roll_No:111, WAD_Marks:25, CC_Marks:25, DSBDA_Marks:25, CNS_Marks:25, AI_Marks:25},
        {Name:"DEF", Roll_No:112, WAD_Marks:30, CC_Marks:20, DSBDA_Marks:22, CNS_Marks:28, AI_Marks:26},
        {Name:"GHI", Roll_No:113, WAD_Marks:15, CC_Marks:18, DSBDA_Marks:10, CNS_Marks:20, AI_Marks:12},
        {Name:"JKL", Roll_No:114, WAD_Marks:40, CC_Marks:35, DSBDA_Marks:30, CNS_Marks:32, AI_Marks:36},
        {Name:"MNO", Roll_No:115, WAD_Marks:22, CC_Marks:21, DSBDA_Marks:24, CNS_Marks:23, AI_Marks:20}
    ]);
    res.send("Students Inserted");
});


// d) Count + display all (table)
app.get("/students", async (req, res) => {
    const data = await Student.find();
    const count = await Student.countDocuments();

    let html = `<h2>Total Students: ${count}</h2>`;
    html += tableFormat(data);

    res.send(html);
});


// e) DSBDA > 20
app.get("/dsbda", async (req, res) => {
    const data = await Student.find({ DSBDA_Marks: { $gt: 20 } }, { Name:1, _id:0 });
    res.send(data);
});


// f) Update marks (+10)
app.get("/update/:name", async (req, res) => {
    await Student.updateOne(
        { Name: req.params.name },
        { $inc: { WAD_Marks:10, CC_Marks:10, DSBDA_Marks:10, CNS_Marks:10, AI_Marks:10 } }
    );
    res.send("Marks Updated");
});


// g) >25 in all subjects
app.get("/above25", async (req, res) => {
    const data = await Student.find({
        WAD_Marks:{$gt:25},
        CC_Marks:{$gt:25},
        DSBDA_Marks:{$gt:25},
        CNS_Marks:{$gt:25},
        AI_Marks:{$gt:25}
    }, {Name:1, _id:0});

    res.send(data);
});


// h) less than 40 in WAD & CNS (Maths & Science equivalent)
app.get("/lessthan40", async (req, res) => {
    const data = await Student.find({
        WAD_Marks:{$lt:40},
        CNS_Marks:{$lt:40}
    }, {Name:1, _id:0});

    res.send(data);
});


// i) Delete specific student
app.get("/delete/:name", async (req, res) => {
    await Student.deleteOne({ Name: req.params.name });
    res.send("Student Deleted");
});


// j) Table format
function tableFormat(data){
    let html = `
    <table border="1" cellpadding="10">
    <tr>
        <th>Name</th>
        <th>Roll No</th>
        <th>WAD</th>
        <th>DSBDA</th>
        <th>CNS</th>
        <th>CC</th>
        <th>AI</th>
    </tr>`;

    data.forEach(s => {
        html += `
        <tr>
            <td>${s.Name}</td>
            <td>${s.Roll_No}</td>
            <td>${s.WAD_Marks}</td>
            <td>${s.DSBDA_Marks}</td>
            <td>${s.CNS_Marks}</td>
            <td>${s.CC_Marks}</td>
            <td>${s.AI_Marks}</td>
        </tr>`;
    });

    html += "</table>";
    return html;
}


// Server
app.listen(3000, ()=>{
    console.log("Server running on http://localhost:3000");
});


