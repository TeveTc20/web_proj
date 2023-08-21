const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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