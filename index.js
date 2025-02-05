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

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', async (req, res) => {
    const {username, email, password} = req.body
    const newUser = await userModel.create({
        username: username,
        email: email,
        password: password
    })
    res.send(newUser)
})

app.get('/get-users', (req, res) => {
    userModel.find({
        username: 'a'
    }).then((users) => {
        res.send(users)
    })
})

app.get('/update-user', async (req, res) => {
    await userModel.findOneAndUpdate({
        username: 'a'
    }, {
        email: 'a@a'
    })
    res.send('User Updated')
})

app.get('/delete-user', async (req, res) => {
    await userModel.findByIdAndDelete({
        username: "a"
    })
    res.send('User Deleted')
})

app.post('/get-form-data', (req, res) => {
    console.log(req.body    )
    res.send('data received')
})

app.listen(3000)