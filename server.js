const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const Item = require('./models/item');
const User = require('./models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');

const sessionConfig = {
    secret: 'lallu',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 100*60*60*24
    }
};

app.use(session(sessionConfig));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect('mongodb://localhost:27017/locate-mate');

const port = process.env.PORT || 3000;

app.post('/register', async (req, res) => {
    try {
        const {email, username, password} = req.body;
        const user = new User({email, username});
        user.name = req.body.name;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists!" });
        }
        const registeredUser = await User.register(user, password);
        res.status(201).json({ success: "Registration successful!" });    
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
});

app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return res.status(500).json({ error: "Server error" });
        if (!user) return res.status(401).json({ error: info.message }); // No redirect, just send JSON

        req.login(user, (err) => {
            if (err) return res.status(500).json({ error: "Login failed" });
            res.status(200).json({ success: "Login successful", user });
        });
    })(req, res, next);
});

app.post('/post-lost', async (req, res) => {
    try {
        const { itemName, description, category, image, location, date, status, imageUrl, userContact } = req.body;
        if(!itemName || !description || !category || !date || !status){
            return res.status(400).json({ message: "All required fields must be filled!"});
        }
        const newItem = new Item({
            itemName,
            description,
            category,
            image, // Optional
            location, // Optional
            date,
            status,
            imageUrl,
            userContact
        });
        await newItem.save();
        res.status(201).json({ message: "Lost item added successfully", item: newItem });
    } catch (e) {
        res.status(500).json({ message: "Server error" });
    }
})

app.get("/browse-lost-items", async (req, res) => {
    try {
        const lostItems = await Item.find({status: "Lost"}); // Fetch lost items from MongoDB
        res.json(lostItems);
    } catch (error) {
        res.status(500).json({ message: "Error fetching lost items" });
    }
});

app.post('/post-found', async (req, res) => {
    try {
        const { itemName, description, category, image, location, date, status, imageUrl, userContact } = req.body;
        if(!itemName || !description || !date || !status){
            return res.status(400).json({ message: "All required fields must be filled!"});
        }
        const newItem = new Item({
            itemName,
            description,
            category,
            image, // Optional
            location, // Optional
            date,
            status,
            imageUrl,
            userContact
        });
        await newItem.save();
        res.status(201).json({ message: "Lost item added successfully", item: newItem });
    } catch (e) {
        res.status(500).json({ message: "Server error" });
    }
});

app.get("/api/auth/user", (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ user: req.user });
    } else {
        res.json({ user: null });
    }
});

app.post('/logout', (req, res) => {
    req.logout((err) => {  
        if (err) return res.status(500).json({ message: "Logout failed" });
        req.session.destroy((err) => {  
            if (err) return res.status(500).json({ message: "Failed to destroy session" });
            
            res.clearCookie("connect.sid", { path: "/", httpOnly: true, secure: false }); // Clear cookie
            return res.json({ message: "Logged out successfully" });
        });
    });
});

app.get("/profile", (req, res) => {
    if (!req.user) return res.status(401).json({ message: "Not logged in" });
    res.json(req.user);
});

app.get("/browse-lost-items/:itemId", async (req, res) => {
    try {
      const item = await Item.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
});
  

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})