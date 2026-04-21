const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    country: {
        type: String,

    },
    firstName: {
        type: String,

    },
    lastName: {
        type: String,

    },
    address:{
        type:String
    },
     apartment:{
        type:String
    },
     city:{
        type:String
    },
     postalCode:{
        type:String
    },
    phoneNo:{
        type:String
    },


})

const Order = mongoose.model("order", orderSchema);

module.exports = Order;