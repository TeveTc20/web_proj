const mongoose = require('mongoose');
const User = require('./User');
const Schema = mongoose.Schema;
const CartItem = require('./CartItem');

const orderSchema = new Schema({
  
    username: {
        type: String,
        required: true,
    },
      carts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'carts',
        }
      ]
      ,
    totalQuantity:{
        type:Number,
        required:true
        },
    totalPrice:{
        type:Number,
        required:true
            },
    createdAt:{
        type: Date,
        default:new Date()
    }
    
});



module.exports = mongoose.model('orders',orderSchema)