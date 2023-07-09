const express = require('express');
const apiroutes = require('./routes/api.routes');
const commentRoutes = require('./routes/comment.routes')
const leaseRoutes = require('./routes/lease.routes')
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session')
app.use(express.json())
const path = require('path');

//load environment file
require('dotenv').config();
// db setup connection
require('./config/db');
const port = process.env.PORT || 7000  ;

app.use(express.static("public"));

app.use(express.static("uploads"));
app.use(express.static("Images"));


app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

// Parses the text as url encoded data
app.use(bodyParser.urlencoded({ extended: false }));
 
// Parses the text as json
app.use(bodyParser.json());

// Express session
app.use(
  session({
    secret: 'welcome to the future!',
    resave: false,
    saveUninitialized: false
  })
);

// import api routes
app.use('/',apiroutes)
app.use('/api',apiroutes)
app.use('/comments',commentRoutes)
app.use('/lease',leaseRoutes);

app.listen(port, () => {
    console.log(`Server started @ http://localhost:${port}`);
  });

