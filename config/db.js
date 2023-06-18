const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();


const mongourl = process.env.MongodbConn;

mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('error', err => {
  console.log(err);
});

mongoose.connection.on('connected', res => {
  console.log('Connected successfully!!');
});
