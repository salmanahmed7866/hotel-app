const express = require("express");
const User = require("../model/user.js")
const { generateToken, jwtAuthMiddleware } = require("../jwt.js")
const routes = express();
const Product = require("../model/product.js");
const sendEmail = require("../middleware/email.js");

function generateOtp() {
    const verificationCode = Math.floor(10000 + Math.random() * 90000).toString();
    return verificationCode;
}

routes.post("/signup", async (req, res) => {

    try {
        const userData = req.body;
        const verificationCode = Math.floor(10000 + Math.random() * 90000).toString();
        verificationExpiry = new Date(Date.now() + 10 * 60 * 1000);
        const userExist = await User.findOne({ email: userData.email })

        if (userExist) {
            if (userExist.isVerified) {
                console.log("User Already exist")
                return res.status(400).json({ message: "User Already Exist" })
            }
            if (!userExist.isVerified) {
                await User.deleteOne({
                    email: userData.email,

                }

                )
                res.status(200).json({ response: userExist })
            }

        }
        const user = new User({ ...userData, verificationCode: verificationCode, verificationExpiry });


        const response = await user.save();
        console.log("Data is saved", user)
        const payload = { id: user.id }
        const token = generateToken(payload);
        sendEmail(user.email, verificationCode)
        res.status(200).json({ response: user })
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal server error" })
    }
})

routes.post("/verifyEmail", async (req, res) => {
    try {
        const { code } = req.body;
        const user = await User.findOne({ verificationCode: code })
        console.log(user)
        if (user.verificationCode != code || user.verificationExpiry < Date.now()) {
            return res.status(400).json({ message: "Invalid or Expired Code" })
        }
        // if (user.verificationExpiry < Date.now()) {

        // }
        user.verificationCode = undefined;
        user.isVerified = true;
        await user.save();
        return res.status(200).json({ success: true, message: "Successfully Verify you email" })

    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Internal server error" })

    }
})

routes.post("/resendOtp", async (req, res) => {
    try {
        const { email } = req.body;
       
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).json({ Error: "User not Found" })
        }
         const otp = generateOtp();
        await sendEmail(email, otp)
       console.log("Otp" ,otp)
        user.verificationCode = otp
        await user.save();
        return res.status(200).json({ success: true, message: "Resend otp succesffuly" })

    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Internal server error" })
    }
})


routes.post("/login", async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ messager: "Invalid username or password" })
        }
        const payload = { id: user.id };
        const token = generateToken(payload);
        res.status(200).json({ response: user, token: token })
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal server error" })
    }
})

routes.get("/getProduct", jwtAuthMiddleware, async (req, res) => {
    try {
        const response = await Product.find()
        res.status(200).json({ reponse: response });
    } catch (e) {
        console.log(e)
    }

})
module.exports = routes;