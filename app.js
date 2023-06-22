const express = require('express');
const apiroutes = require('./routes/api.routes');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session')
app.use(express.json())


//load environment file
require('dotenv').config();
// db setup connection
require('./config/db');
const port = process.env.PORT || 7000  ;

app.use(express.static('public'));
app.set('view engine','ejs');

// Parses the text as url encoded data
app.use(bodyParser.urlencoded({ extended: true }));
 
// Parses the text as json
app.use(bodyParser.json());

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);
// import api routes
app.use('/api',apiroutes)


app.listen(port, () => {
    console.log(`Server started @ http://localhost:${port}`);
  });

