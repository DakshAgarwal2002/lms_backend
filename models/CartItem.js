const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartItem = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String
    },
    author:{
        type: String
    },
    cost:{
        type: String
    },
    image_url:{
        type: String
    },
  });

  module.exports = mongoose.model('cart', CartItem);