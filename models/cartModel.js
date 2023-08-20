const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    kit: {
        type: Schema.Types.ObjectId,
        ref: 'kits',
        required: true,
    },
    kitDescription: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true,
        enum: ['S', 'M', 'L', 'XL', 'XXL'], // Only allow 'S', 'M', 'L', 'XL', 'XXL' as valid values
    },
    quantity: {
        type: Number,
        default: 1,
        min: 1,
    },
    totalPrice: {
        type: Number,
        required: true,
    }


});

module.exports = mongoose.model('carts', cartSchema);
