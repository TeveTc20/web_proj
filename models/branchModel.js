const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const branch = new Schema({
  
    name: {
        type: String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
   });

module.exports = mongoose.model('branch',branch)