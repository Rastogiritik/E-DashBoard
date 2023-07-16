const mongoose = require('mongoose');

const productSchema =new mongoose.Schema(
    {
        name:String,
        price:String,
        company:String,
        category:String,
        userId:String
    }
);

module.exports = mongoose.model('products', productSchema); 