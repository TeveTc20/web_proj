const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path');
const mongoose = require('mongoose')
const kitRouter = require('./routes/router')

// const newLocal= require('custom-env')
// newLocal.env(process.env.NODE_ENV,'./config')
const dbUrl = "mongodb+srv://tevetc20:3wzhPn4JkbWXSXLe@cluster0.4fyo9bq.mongodb.net/db?retryWrites=true&w=majority"
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,  // Use the correct option name
  };

const app = express();


app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, "views")))

app.use('/',kitRouter);

app.listen(8080,()=>{
    console.log("PORT connected")
})
mongoose.connect(dbUrl,connectionParams).then(()=>{
    console.info("Connected to the DB")
}).catch((e)=>{
    console.log("Error:",e)
})