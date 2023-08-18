const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    username: {
         type: String, 
         required: true,
         unique:true
         },
    email:{
        type: String,
         required:true,
        unique:true
    },
    password:{
        type: String,
         required:true 
    },  
    userType:{
        type:String,
        enum:['admin','client'],
        default:'client'    
    },
});

module.exports = mongoose.model('user',user)