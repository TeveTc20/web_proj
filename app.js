const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const kitRouter = require('./routes/router')
const session=require('express-session')
// const newLocal= require('custom-env')
// newLocal.env(process.env.NODE_ENV,'./config')
const dbUrl = "mongodb+srv://tevetc20:3wzhPn4JkbWXSXLe@cluster0.4fyo9bq.mongodb.net/db?retryWrites=true&w=majority"

mongoose.connect(dbUrl,
{
 useNewUrlParser: true,
  useUnifiedTopology: true,
 });


const app = express();


app.set('view engine','ejs');
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());
app.use(session({ secret: 'mySecretKey', resave: true, saveUninitialized: true }));
app.use('/',kitRouter);
// app.listen(8080)
const http=require('http').Server(app)
http.listen(8080)