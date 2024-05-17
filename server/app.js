const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose')
const Discussion = require('./models/discussions');
const { render } = require('ejs');


// Connect to mongoDB
const dbURI = 'mongodb+srv://jfaust:LoggerPro77@cluster0.jddiwm6.mongodb.net/Uniforums?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(dbURI) // asynchronous
    .then((result) => app.listen(3000)) //listens for requests once we are connnected to database
    .catch((err) => console.log(err))


// register view engine
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true}));
app.use(morgan("dev"));
app.use(express.static('views'));
app.use(express.static(__dirname + '/public')); //contains css and images






app.get('/', (req, res) => {
    res.render('home', { title: 'Home'});
})


// DISCUSSIONS
app.get('/discussions', (req, res) => {
    Discussion.find()
    .then((result) => {
        res.render('all_discussions', { title: 'View Discussions', discussions: result })
    })
    .catch((err) => {
        console.log(err)
    })
})

app.post("/discussions", (req, res) => {
    //console.log(req.body)
    const discussion = new Discussion(req.body);
    discussion.save()
        .then((result) => {
            res.redirect("/discussions") //shows new discussion posted. Can change to specific discussion url
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/discussions/create', (req, res) => {
    res.render('create_discussion', { title: 'Create Discussion'});
})

app.get("/discussions/:id", (req, res) => {
    const id = req.params.id
    console.log(id)
    Discussion.findById(id)
        .then(result => { // title is the tab title
            res.render("single_discussion", { title: "Single Discussion", discussion: result })
        })
        .catch(err => {
            console.log(err)
        })
})
        
// error potentially because we are not deleting from /discussions but from /discussions/create
app.delete('/discussions/:id', (req, res) => {
    const id = req.params.id
    Discussion.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/discussions'})
        })
        .catch(err => {
            console.log(err)
        })
})

//news
app.get('/news', (req, res) => {
    res.render('all_news', { title: 'All News Articles'});
})

// announcements
app.get('/createAnnouncement', (req, res) => {
    res.render('create_announcement', { title: 'Create Announcement'});
})

app.get('/singleAnnouncement', (req, res) => {
    res.render('single_announcement', { title: 'Announcement'});
})

// all announcements here 

//newss articles (don't create, uploaded from school somehow)

//single news article here

//all news articles here


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
    res.render('single_article', { title: 'Article'});
})


//remove??
app.get('/allArticles', (req, res) => {
    res.render('all_articles', { title: 'All Articles'});
})

app.get('/allAnnouncements', (req, res) => {
    res.render('all_announcements', { title: 'All Announcements'});
})

app.use((req, res) => {
    res.status(404).render('404', { title : "404"});
})

