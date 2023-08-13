const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const jersey = require('./routes/jerseyRoute')
const newLocal= require('custom-env')
// newLocal.env(process.env.NODE_ENV,'./config')

const dbUrl = "mongodb+srv://tevetc20:ICInMEEsWjOf32wt@cluster0.4fyo9bq.mongodb.net/"

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,  // Use the correct option name
  };

mongoose.connect(dbUrl,connectionParams).then(()=>{
    console.info("Connected to the DB")
}).catch((e)=>{
    console.log("Error:",e)
})

const app = express();

app.set('view engine','ejs');
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());

app.listen(8080)