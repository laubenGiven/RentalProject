const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')

const Port = process.env.Port
const MongoConn = process.env.Mongo_url

mongoose.connect(MongoConn,{useNewUrlParser:true,useUnifiedTopology:true})
 mongoose.connection.on('error',err=>{
    console.log(err)
 })

 mongoose.connection.on('connected',res=>{
    console.log('successfull DB Connection!')
 })