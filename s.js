if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
// const Item = require('./models/Item');
// const User = require('./models/User');
const {storage} = require('./cloudinary');
const {isLoggedIn} = require('./middleware');
const multer = require('multer');
const upload = multer({storage});
const session = require('express-session');
const catchAsync = require('./utils/CatchAsync');
const ExpressError = require('./utils/ExpressError');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const { register } = require('module');
mongoose.connect('mongodb://localhost:27017/locate-mate')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const sessionConfig = {
    secret: 'thisshouldbeabettersecret!!',
    resave: false,
    saveUninitialized: true
}

const db = mongoose.connection;
db.once('open', function() {
    console.log("CONNECTION OPEN !");
})

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.post('/browse-lost-items' , upload.single("image"), catchAsync(async (req, res, next) => {
    const item = new Item(req.body);
    item.date = new Date(item.date);
    if(req.file){
        item.image.url = req.file.path;
        item.image.filename = req.file.filename;
    }
    await item.save();
    res.redirect('/browse-lost-items');
}))

app.get('/browse-lost-items', catchAsync(async (req, res) => {
    const lostItems = await Item.find({status: "Lost"});
    res.render('items/browse-lost-items', {lostItems});
}))

app.get('/browse-lost-items/:id', catchAsync(async (req, res) => {
    const id = req.params.id;
    const item = await Item.findById(id);
    res.render('items/item-details', {item});
}))

app.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), (req, res) => {
    req.flash('success', 'Welcome Back!');
    res.redirect('/');
})

app.post('/register', catchAsync( async (req, res) => {
    // console.log("lallu");
    try{
        const {email, username, password} = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if(err) return next(err);
            req.flash('success', 'Welcome to Locate Mate!');
            res.redirect('/');
        });
    }
    catch(e) {
        req.flash('error', 'Username already exists');
        res.redirect('/register');
    }
}))

app.get('/register', (req, res) => {
    res.render('users/register');
})

app.get('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) {
          return next(err);
        }
        req.flash("success", "You have been logged out successfully!");
        res.redirect("/");
      });      
})

app.get('/posts', (req, res) => {
    res.render('posts');
})

app.get('/post-lost', isLoggedIn, (req, res) => {
    res.render('items/post-lost');
})

app.get('/post-found', (req, res) => {
    res.render('items/post-found');
})

app.get('/profile', (req, res) => {
    const user = User.findById(req.params.id);
    console.log(user);
    res.render('users/profile', {user});
})

app.get('/debug', (req, res) => {
    console.log("Current User:", req.user);
    res.json(req.user || { message: "No user logged in" });
});

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const {statusCode = 500} = err;
    if(!err.message) err.message = 'Oh no! Something went wrong!'
    res.status(statusCode).render('error', {err});
})

app.listen(3000, () => {
    console.log("Serving on port 3000!");
})