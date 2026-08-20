const express = require("express");
const app = express();
const Order = require("./model/order")
const bodyParser = require('body-parser');
const uploadFileRoutes = require("./upload_file")
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const db = require("./db")
const cors = require("cors")
const Product = require("../model/product.js");
const { generateToken, jwtAuthMiddleware } = require("./jwt.js")
const data = require("./assets/data");
const { default: mongoose } = require("mongoose");
const Product = require("./model/product");
const Cart = require("./model/cart")
require("dotenv").config()
const userRoutes = require("./routes/user_routes")

app.use(cors({
    // origin: "https://ecommerce-app-taupe-rho.vercel.app",
    // credentials: true
}));


app.use("/user", userRoutes);
app.use("/image", uploadFileRoutes);

app.post("/checkout", async (req, res) => {
    try {
        const order = req.body
        const orderData = new Order(order)
        const response = await orderData.save();
        res.status(200).json({ reaponse: response })
        console.log("Data is saved")
    }
    catch (e) {
        res.status(500).json({ error: "Interanl server Error" })
    }

})
app.get("/getProduct", jwtAuthMiddleware, async (req, res) => {
    try {
        const response = await Product.find()
        res.status(200).json({ reponse: response });
    } catch (e) {
        console.log(e)
    }

})
app.post("/cart", async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            const cartData = new Cart({ userId, items: [{ productId, quantity }] });
            const response = await cartData.save();
            res.status(200).json({ response: response })
        }
        else {
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId)
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            }
            else {
                cart.items.push({ productId, quantity });
            }
            await cart.save();
            res.status(200).json({ response: cart })

        }

    }
    catch (e) {
        res.status(500).json({ error: e.message })
    }

})

app.get("/cart/:userId", async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId })
            .populate({
                path: "items.productId",
                select: "_id name image new_price old_price"
            });

        res.json(cart);

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});



app.post("/products", async (req, res) => {

})
app.get("/", (req, res) => {
    res.send("Get Method is Working and heoolo")
    console.log("get method is calling and heoolo")
})

module.exports = app;
// app.listen(3000, () => { console.log("App is Running on 3000") })