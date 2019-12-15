const express = require("express");
const index = require('./routes/index');
const users = require('./routes/users');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
const expressLayouts = require('express-ejs-layouts');


// mongo client
// mongoose.connect('mongodb://localhost:27017/PassportData', { useNewUrlParser: true })
// .then( (db)=>{
//      console.info('db connected');
//  }).catch(error => {
//      console.info("db error", error);
//  });


// DB config
const db = require('./config/keys').MongoURI;

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true })
   .then(() =>{
       console.log('Mongodb is Connected....');
   })
   .catch(err => {
       console.log(err);
   });



// ejs middleware
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Bodyparser
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/', index);
app.use('/users', users);


app.listen(PORT, console.log(`Server started on port ${PORT}`));