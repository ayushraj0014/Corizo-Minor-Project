const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Student = require('./models/Student');



const app = express();
const PORT = 5000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


mongoose.connect('mongodb://localhost:27017/studentDB');

// Fetch all students
app.get('/', async (req, res) => {
    const students = await Student.find();
    res.render('index', { students });
});

// Save a new student
app.post('/save', async (req, res) => {
    const { rollNo, name, degree, city } = req.body;
    const student = new Student({ rollNo, name, degree, city });
    await student.save();
    res.redirect('/');
});

// Display the edit form with current student data
app.get('/edit/:id', async (req, res) => {
    const student = await Student.findById(req.params.id);
    res.render('edit', { student });
});

// Update the student data
app.post('/update/:id', async (req, res) => {
    const { rollNo, name, degree, city } = req.body;
    await Student.findByIdAndUpdate(req.params.id, { rollNo, name, degree, city });
    res.redirect('/');
});

// Delete a student
app.post('/delete/:id', async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server is running on Port : ${PORT}`);
});
