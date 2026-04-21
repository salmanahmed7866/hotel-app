const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    image: { type: String },
    new_price: { type: Number },
    old_price: { type: Number }
})

const Product = mongoose.model("Product", productSchema)
module.exports = Product