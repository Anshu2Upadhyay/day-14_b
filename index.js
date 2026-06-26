const express = require('express')
const app = express();

let  students = [
    {id: 1, name: "John Doe", city: "Gorakhpur"},
    {id: 2, name: "Jane Smith", city: "Lucknow"},
];

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to the Student API");
});

app.get("/students", (req, res) => {
    res.json({
        message: "List of students",
        data: students
    });
});
app.post("/students", (req,res)=>{
    const { id , name, city } = req.body;
    const newStudent = { id, name, city };
    students.push(newStudent);
    res.json({
        message: "Student added successfully",
        data: newStudent
    });
});
// data update

app.put("/students/:id", (req, res) => {
    // const studentId = parseInt(req.params.id);
    const {id} = req.params;
    const student = students.find(s => s.id === (id));
    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    student.name = req.body.namme;
    student.city = req.body.city;
    res.json({
        message: "Student updated successfully",
        data: student
    });
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});