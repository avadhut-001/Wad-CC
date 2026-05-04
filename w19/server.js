const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/student")
    .then(() => console.log("Mongodbconnected"))
    .catch((err) => console.log(err));

const studentSchema = new mongoose.Schema({
    Name: String,
    Roll_No: Number,
    Wad_marks: Number,
    CC_Marks: Number,
    DSBDA_Marks: Number,
    CNS_Marks: Number,
    AI_Marks: Number
})

const student = mongoose.model("students", studentSchema);

app.get('/insert', async (req, res) => {
    await student.insertMany([
        { Name: "avadhut", Roll_No: 33125, Wad_marks: 23, CC_Marks: 55, DSBDA_Marks: 66, CNS_Marks: 99, AI_Marks: 98 },
        { Name: "DEF", Roll_No: 112,  Wad_marks: 30, CC_Marks: 20, DSBDA_Marks: 22, CNS_Marks: 28, AI_Marks: 26 },
        { Name: "GHI", Roll_No: 113,  Wad_marks: 15, CC_Marks: 18, DSBDA_Marks: 10, CNS_Marks: 20, AI_Marks: 12 },
        { Name: "JKL", Roll_No: 114,  Wad_marks: 40, CC_Marks: 35, DSBDA_Marks: 30, CNS_Marks: 32, AI_Marks: 36 },
        { Name: "MNO", Roll_No: 115,  Wad_marks: 22, CC_Marks: 21, DSBDA_Marks: 24, CNS_Marks: 23, AI_Marks: 20 }
    ])
    res.send("data added");
})

app.get('/student', async (req,res) => {
    const data = await student.find();
    const count = await student.countDocuments();

    let html =`<h2>Total Students: ${count}</h2>`
    html += studentdata(data);
    res.send(html);
})

app.get('/dsbda', async (req,res)=> {
    const data = await student.find({ DSBDA_Marks: {$gt: 20}}, {Name:1, _id:0});
    res.send(data);
})
app.get('/update/:name', async (req,res)=> {
    await Student.updateOne(
        { Name: req.params.name },
        { $inc: { WAD_Marks:10, CC_Marks:10, DSBDA_Marks:10, CNS_Marks:10, AI_Marks:10 } }
    );
    res.send("marks Updated");
})

app.get('/above25', async (req,res)=> {
    const data = await student.find({
        Wad_marks:{$gt:25},
        CC_Marks:{$gt:25},
        DSBDA_Marks:{$gt:25},
        CNS_Marks:{$gt:25},
        AI_Marks:{$gt:25}
    });
    res.send(data);
});

app.get("/lessthan40", async (req, res) => {
    const data = await Student.find({
        WAD_Marks:{$lt:40},
        CNS_Marks:{$lt:40}
    }, {Name:1, _id:0});

    res.send(data);
});

app.get("/delete/:name", async (req,res)=> {
    await student.deleteOne({Name: req.params.name});
    res.send("Deleted");
})

function studentdata(data) {
    let html = "<h2> Students Data</h2>"
    html += `
        <table border="1" cellpadding="10">

        <tr>
            <th>Name</th>
            <th>Roll No</th>
            <th>WAD</th>
            <th>DSBDA</th>
            <th>CNS</th>
            <th>CC</th>
            <th>AI</th>
        </tr>
    `;

    data.forEach(s => {
        html+=`
            <tr>
                <td>${s.Name}</td>
                <td>${s.Roll_No}</td>
                <td>${s.Wad_marks}</td>
                <td>${s.DSBDA_Marks}</td>
                <td>${s.CNS_Marks}</td>
                <td>${s.CC_Marks}</td>
                <td>${s.AI_Marks}</td>
            </tr>
        `
    }

)
    html+="</table>"

    return html;
}
app.listen(3000, () => console.log("server is running"));