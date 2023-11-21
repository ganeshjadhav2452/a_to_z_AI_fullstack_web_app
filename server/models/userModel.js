const dotenv = require('dotenv')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cookie = require('cookie')
dotenv.config()




const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "User Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: [6, "password length should be more than 6"],
    },
    customerId: {
        type: String,
        default: "",
    },
    subscription: {
        type: String,
        default: "",
    },
});

// hashing password
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// match password

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// generate jwt token
UserSchema.methods.getSingedToken = async function (res) {
    const accessToken = await jwt.sign(
        { id: this._id },
        process.env.JWT_ACCESS_SECRETE,
        { expiresIn: process.env.JWT_ACCESS_EXPIRESIN }
    );

    const refreshToken = await jwt.sign(
        { id: this._id },
        process.env.JWT_REFRESH_TOKEN,
        { expiresIn: process.env.JWT_REFRESH_EXPIRESIN }
    );

    res.cookie("refreshToken", `${refreshToken}`, {
        maxAge: 86400 * 7000,
        httpOnly: true,
    });

    return accessToken;
};
module.exports = User = mongoose.model("User", UserSchema);
