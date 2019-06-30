//global access modules
global.Promise = require("bluebird")
global._ = require("lodash")

const express = require("express");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const PORT = process.env.PORT || 3000 ;

require('dotenv').config();

const passport = require("passport");
const passportJWT = require("passport-jwt");
const LocalStrategy = require("passport-local");

const app = express();
const router = require("./routes/index")
const db = require("./lib/db")


app.use(passport.initialize());
app.use(passport.session());

require('./config/passport-config');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json())

db.connect();

//routes
app.use('/' , router)
app.use('user' , require("./routes/UserRoute"))

app.listen(PORT,()=>{
    console.log("your server is running and up on 3009 port")
})