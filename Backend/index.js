const express = require("express");
const app = express();
const cors = require("cors");
const User = require('./models/user.js');
const passport = require('passport');
const LocalStratergy = require('passport-local');
const session = require('express-session');
const port = 5000;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const mongoose = require('mongoose');
main().then(()=>{console.log("Connection Successful")}).catch(err=>{console.log(err)})
async function main() { await mongoose.connect("mongodb://127.0.0.1:27017/newzbuzz");}

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.post("/signup",async(req,res,next)=>{
    try{
        let{username,email,password}=req.body;
        const newuser = new User({email,username});
        const registereduser=await User.register(newuser,password);
        res.status(200).send("Succesfully  Registered");
    } catch(err){
        console.log(err.mesaage);
        res.status(400).send(err.mesaage);
    }

})
app.post('/login', 
    passport.authenticate('local', { failureRedirect: '/login' }),
    (req, res)=>{
    res.status(200).send("Welcome To NewzBuzz");
});
app.listen(port,()=>{
    console.log("Listening...");
})