const express = require("express")

const app = express();

let students = [
    { id: 1, name: "Nirmal", city: "Gorakhpur" },
    { id: 2, name: "Sachin", city: "GKP" }
];

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API IS RUNNING");
});

// Data Retrieve
app.get("/students", (req, res) => {
    res.json({
        message: "All Students",
        data: students
    });
});
app.get("/students/:id", (req, res) => {
    const id = req.params.id;
    const student = students.find(s => s.id == id);
    if (!student) {
        return res.status(404).json({
            message: "Student Not Found"
        });
    }

    res.json({
        message: "Student Found",
        data: student
    });
});
// Data Store
app.post("/students", (req, res) => {
    const { id, name, city } = req.body;
    const newStudent = { id, name, city };
    students.push(newStudent);
    res.json({
        message: "Record Added",
        student: newStudent,
        data: students
    })
});

// Data Update
app.put("/students/:id", (req, res) => {
    // const id = req.params.id;
    const { id } = req.params;
    const student = students.find(s => s.id == id);
    // if student found = value....
    if (!student) {
        return res.status(404).json({
            message: "Student Not Found"
        });
    }
    student.name = req.body.name;
    student.city = req.body.city;

    res.json({
        message: "Record updated",
        student
    });
});

app.delete("/students/:id", (req, res) => {
    const id = req.params.id;
    const student = students.find(s => s.id == id);
    if (!student) {
        return res.status(404).json({ message: "Invalid ID" });
    }

    students = students.filter(s => s.id != id);
    res.json({
        message:"Record Deleted",
        students
    })
});
app.listen(3000, () => {
    console.log("Server Started");
});