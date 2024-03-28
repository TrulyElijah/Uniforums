const express = require('express');
const app = express();
const mongoose = require('mongoose')
const Discussion = require('./models/discussions');

// Connect to mongoDB
const dbURI = 'mongodb+srv://jfaust:LoggerPro77@cluster0.jddiwm6.mongodb.net/Uniforums?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(dbURI) // asynchronous
    .then((result) => app.listen(3000)) //listens for requests once we are connnected to database
    .catch((err) => console.log(err))

// register view engine
app.set('view engine', 'ejs')
app.use(express.static('views'));
app.use(express.static(__dirname + '/public')); //contains css and images


// mongoose and mongo sandbox routes

app.get('/', (req, res) => {
    res.render('home', { title: 'Home'});
})

app.get('/createDiscussion', (req, res) => {
    res.render('create_discussion', { title: 'Create Discussion'});
})

// all discussions
app.get('/viewDiscussions', (req, res) => {
    Discussion.find()
    .then((result) => {
        res.render('all_discussions', { title: 'View Discussions', discussions: result })
    })
    .catch((err) => {
        console.log(err)
    })
})

app.get('/createAnnouncement', (req, res) => {
    res.render('create_announcement', { title: 'Create Announcement'});
})

app.get('/singleAnnouncement', (req, res) => {
    res.render('single_announcement', { title: 'Announcement'});
})

// all announcements

//single news article

//all news articles


app.get('/login', (req, res) => {
    res.render('login', { title: 'Login'});
})

app.get('/createAccount', (req, res) => {
    res.render('create_account', { title: 'Create Account'});
})

app.get('/viewProfile', (req, res) => {
    res.render('view_profile', { title: 'Profile'});
})

app.get('/singleArticle', (req, res) => {
    res.render('single_article', { title: 'Single Article'});
})

app.use((req, res) => {
    res.status(404).render('404');
})

