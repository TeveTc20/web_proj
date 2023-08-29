const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const kitSchema = new Schema({

  league: {
    type: String,
    required: true,
  },
  team_name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  description:{
    type: String,
    required:true 
},
price:{
  type: String,
  required:true 
},
image: {
  type: String, 
  required: true,
},
 salesCount: {
    type: Number,
    default: 0,
  },
  isAvailable: {
    type: Boolean,
    default: true, 
  },

});

module.exports = mongoose.model('kits', kitSchema);