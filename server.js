//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const session = require('express-session');
const mongoose = require ('mongoose');
const app = express ();
const bcrypt = require('bcrypt')
const db = mongoose.connection;

require("dotenv").config();
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/'+ "test-db";

// Connect to Mongo
mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo
db.on('open' , ()=>{});

//___________________
//Middleware
//___________________

app.use((req, res, next) => {
  console.log(
    `${new Date().toISOString()} :: ${req.method} ${req.originalUrl}`
  );
  next();
});


app.use(
  session({
    secret: process.env.SECRET, //a random string do not copy this value or your stuff will get hacked
    resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
    saveUninitialized: false // default  more info: https://www.npmjs.com/package/express-session#resave
  })
)

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

//controller
const birdController= require("./controllers/endgbirds.js");
app.use(birdController);


// const sessionsController = require('./controllers/sessions_controller.js')
// app.use('/sessions', sessionsController)

// allows to store info about the browser that sent a request.
app.get('/create-session', (req, res) => {
  //any route will work
  req.session.anyProperty = 'any value'
  res.redirect("/birds");
})


app.get('/retrieve-session', (req, res) => {
  //any route will work
  if (req.session.anyProperty === 'something you want it to') {
    //test to see if that value exists
    //do something if it's a match
    console.log('it matches! cool')
  } else {
    //do something else if it's not
    console.log('nope, not a match')
  }
  res.redirect('/birds')
})


app.get('/update-session', (req, res) => {
  //any route will work
  req.session.anyProperty = 'changing anyProperty to this value'
  res.redirect('/birds')
})

app.get('/delete-session', (req, res) => {
  //any route will work
  req.session.destroy(err => {
    if (err) {
      
    } else {
      //do something if destroying the session succeeds
    }
  })
  res.redirect('/birds')
})


app.get("/test-bcrypt", (req, res) => {
  const hashedString = bcrypt.hashSync("password", bcrypt.genSaltSync(10));
  console.log(hashedString);
  const samePassword = bcrypt.compareSync("password", hashedString);
  console.log(`The password is the same? ${samePassword}`);

  res.redirect("/birds");
});





//___________________
// Routes
//___________________
//localhost:3000
app.get('/' , (req, res) => {
  res.send('Hello World!');
});

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));