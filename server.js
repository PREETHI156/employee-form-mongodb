const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Student = require('./models/student');
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/studentsDB', {

useNewUrlParser: true, useUnifiedTopology: true })

.then(() => console.log('Connected to MongoDB'))

 .catch(err => console.error('Error connecting to MongoDB:', err));

 

app.set('view engine', 'ejs'); app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));


app.get('/', async (req, res) => {

try {

const students = await Student.find();

res.render('index', { students });

 }

 catch (err) {

console.error(err);

res.status(500).send('Internal Server Error');

}

 });

 // Add student form

app.get('/add', (req, res) => { res.render('form'); });

 // Add a new student

 app.post('/add', async (req, res) => {

const { name, age, role } = req.body;

const student = new Student({ name, age, role });

try {

await student.save();

res.redirect('/');

} catch (err) {

console.error(err);

res.status(500).send('Internal Server Error'); } });


app.listen(PORT, () => { console.log(`Server running on port ${PORT}`); });