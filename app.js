const express = require('express');
const app = express();

// register view engine
app.set('view engine', 'ejs')

app.use(express.static('views'));
app.use(express.static(__dirname + '/public')); //contains css and images

app.listen(3000); //listens for requests


//routing

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/createAccount', (req, res) => {
    res.render('create_account');
})

app.get('/createAnnouncement', (req, res) => {
    res.render('create_announcement');
})

app.get('/createDiscussion', (req, res) => {
    res.render('create_discussion');
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/singleAnnouncement', (req, res) => {
    res.render('single_announcement');
})

app.get('/viewProfile', (req, res) => {
    res.render('view_profile');
})



// 404 page -> fires when no other files are matched to url name
app.use((req, res) => {
    res.status(404).render('404');
})

