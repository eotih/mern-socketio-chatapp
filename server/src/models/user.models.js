const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const User = new Schema(
    {
        name: {
            type: String,
            required: "Name is required!",
        },
        email: {
            type: String,
            required: "Email is required!",
        },
        password: {
            type: String,
            required: "Password is required!",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", User);
