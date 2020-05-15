/*
Packages used:
bcryptjs            : To hash passwords before we store them in out database
body-parser         : To parse incoming request bodies in a middleware
concurrently        : To run different commands together in the same cmd
express             : Our backend framework
validator           : To validate user inputs (confirming passwords match)
is-empty            : Global function, handy when using validator
jsonwebtoken(JWT)   : For authorization
mongoose            : To interact with MongoDB in express
passport            : To authenticate requests
passport-jwt        : A passport stratergy for authenticating JWTs
dotenv              : To store private data
*/

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const dotenv = require("dotenv");

const users = require("./routes/api/user_routes");
const bmi = require("./routes/api/bmi_routes");

// Create express App
const app = express();

// Config .env file
dotenv.config();

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

// Database Config and Connect
// require("./config/keys").mongoURI
const db_URI = process.env.mongoURI || process.env.MONGODB_URI ;
mongoose
    .connect(db_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology:true
    })
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.log("MongoDB Error: ", err);
    });

// Passport Middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/bmi", bmi);


// Heroku
if(process.env.NODE_ENV === 'production'){
    // Once Heroku is in production, 
    // Serve the build folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
    });
}

// Start listening
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})