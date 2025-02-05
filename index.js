const express = require('express');
const morgan = require('morgan');
const userModel = require('./models/user')
const dbConnection = require('./config/db.js');
const app = express()

app.use(morgan('dev'));

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

app.set("view engine", 'ejs')

app.get('/', (req, res, next) => {
    const a = 5;
    const b = 10;
    console.log(a+b);
    next()
}, (req, res) => {
    res.render('index')
})


app.get('/about', (req, res) => {
    res.send('About Page')
})

app.get('/profile', (req, res) => {
    res.send('Profile Page')
})

app.post('/get-form-data', (req, res) => {
    console.log(req.body    )
    res.send('data received')
})

app.listen(3000)