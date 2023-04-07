const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser'); // parser middleware
const session = require('express-session'); 
const passport = require('passport');
const db = require('./Models/user')
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const passportConfig = require('./Config/passport')


//setup template engine
app.set("view engine", "ejs");

// routers
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
  }));

// middlewares
app.use(express.urlencoded({extended:false}))


// passport middleware
app.use(passport.initialize());
app.use(passport.session());



app.use('/users',require('./Routes/userRoute'))
app.use('/post',require('./Routes/postRoute'))

// Home route
app.get("/", (req, res) => {
    res.render("home");
  });


const PORT = 5000

app.listen(PORT,()=> console.log(`server is running on port ${PORT}`))