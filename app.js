const express = require('express');
const apiroutes = require('./routes/api.routes');
const app = express();
app.use(express.json())

//load environment file
require('dotenv').config();
// db setup connection
require('./config/db');
const port = process.env.PORT || 7000  ;

app.use(express.static('public'));
app.set('view engine','ejs');

// import api routes
app.use('/api',apiroutes)


app.listen(port, () => {
    console.log(`Server started @ http://localhost:${port}`);
  });

