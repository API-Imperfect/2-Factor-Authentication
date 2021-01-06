const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add your name"],
    },
    email: {
        type: String,
        required: [true, "Please provide your correct email address"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email address"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minLength: 8,
        select: false,
    },
    confirmPassword: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            validator: function (pass) {
                return pass === this.password;
            },
            message: "Passwords are not the same",
        },
    },
    twoFactorAuthCode: String,
    twoFactorAuthEnabled: Boolean,
});

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    this.confirmPassword = undefined;
    next();
});

UserSchema.methods.signJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

UserSchema.methods.correctPassword = async function (userPassword) {
    return await bcrypt.compare(userPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
