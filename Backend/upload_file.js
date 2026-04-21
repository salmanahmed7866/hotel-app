const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const getDataUrl = require("./buffer_generator.js");
const multer = require("multer");
const express = require("express");
const routes = express();
const Product = require("./model/product.js")
const { default: mongoose } = require("mongoose");

cloudinary.config({ cloud_name: "dl3jordft", api_key: "466636893421112", api_secret: "NIVOhdRWBB6VaoGyMvjO0IB3lYQ" });

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'my-photos',
        format: async (req, file) => 'png', // supports promises as well
        public_id: (req, file) => file.fieldname + "-" + Date.now(),
    },
});


const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } })

routes.post("/uploads", upload.single("file"), async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        const productData = new Product({ name: req.body.name, image: req.file.path, new_price: req.body.new_price, old_price: req.body.old_price })
        const response = await productData.save();
        //  res.send("File Uploaded Successfully")
        res.status(200).json({ reponse: response })
    }
    catch (e) {
        console.log("Error", e)
    }
})

routes.get("/getProduct", async (req, res) => {
    try {
        const response = await Product.find()
        res.status(200).json({ reponse: response });
    } catch (e) {
        console.log(e)
    }

})
module.exports = routes