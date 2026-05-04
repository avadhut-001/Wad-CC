const express = require("express");
const mongoose = require("mongoose");

const app = express();

// a) Create DB "employee"
mongoose.connect("mongodb://127.0.0.1:27017/employee")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

// b) Collection "employees"
const empSchema = new mongoose.Schema({
    Name: String,
    Department: String,
    Designation: String,
    Salary: Number,
    Joining_Date: String
});

const Employee = mongoose.model("employees", empSchema);


// c) Insert multiple employees
app.get("/insert", async (req, res) => {
    await Employee.insertMany([
        {Name:"Rahul", Department:"IT", Designation:"Developer", Salary:50000, Joining_Date:"2024-01-10"},
        {Name:"Amit", Department:"HR", Designation:"Manager", Salary:60000, Joining_Date:"2023-05-15"},
        {Name:"Sneha", Department:"Finance", Designation:"Analyst", Salary:55000, Joining_Date:"2022-08-20"},
        {Name:"Priya", Department:"IT", Designation:"Tester", Salary:45000, Joining_Date:"2024-02-01"},
        {Name:"Karan", Department:"Sales", Designation:"Executive", Salary:40000, Joining_Date:"2023-11-12"}
    ]);

    res.send("Employees Inserted");
});


// d) View all employees + count (table format)
app.get("/employees", async (req, res) => {
    const data = await Employee.find();
    const count = await Employee.countDocuments();

    let html = `<h2>Total Employees: ${count}</h2>`;
    html += tableFormat(data);

    res.send(html);
});


// e) Add single employee (dynamic)
app.get("/add", async (req, res) => {
    await Employee.create({
        Name: req.query.name,
        Department: req.query.dept,
        Designation: req.query.desig,
        Salary: req.query.salary,
        Joining_Date: req.query.date
    });

    res.send("Employee Added");
});
app.get("/addemp", async (req, res) => {
    await Employee.create({
        Name: req.query.name,
        Department: req.query.dept,
        Designation: req.query.desig,
        Salary: req.query.salary,
        Joining_Date: req.query.date
    });

    res.send("Employee Added");
});

// f) Update employee details
app.get("/update/:name", async (req, res) => {
    await Employee.updateOne(
        { Name: req.params.name },
        {
            Department: req.query.dept,
            Designation: req.query.desig,
            Salary: req.query.salary,
            Joining_Date: req.query.date
        }
    );

    res.send("Employee Updated");
});


// g) Delete employee
app.get("/delete/:name", async (req, res) => {
    await Employee.deleteOne({ Name: req.params.name });
    res.send("Employee Deleted");
});


// h) Table format
function tableFormat(data){
    let html = `
    <table border="1" cellpadding="10">
    <tr>
        <th>Name</th>
        <th>Department</th>
        <th>Designation</th>
        <th>Salary</th>
        <th>Joining Date</th>
    </tr>`;

    data.forEach(e => {
        html += `
        <tr>
            <td>${e.Name}</td>
            <td>${e.Department}</td>
            <td>${e.Designation}</td>
            <td>${e.Salary}</td>
            <td>${e.Joining_Date}</td>
        </tr>`;
    });

    html += "</table>";
    return html;
}


// Server
app.listen(3000, ()=>{
    console.log("Server running on http://localhost:3000");
});