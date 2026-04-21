const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

    isVerified: {
        type: Boolean,
        default: false

    },
    verificationExpiry: Date,
    verificationCode: String

}, { timestamps: true })

userSchema.pre('save', async function () {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(this.password, salt);
        this.password = hashpassword;


    }
    catch (e) {
        return (e)

    }

});


userSchema.methods.comparePassword = async function (password) {
    try {
        const isMatch = await bcrypt.compare(password, this.password);

        return isMatch;
    }
    catch (e) {
        throw e
    }

}
const User = mongoose.model("user", userSchema);
module.exports = User;