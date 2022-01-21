const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Message = new Schema(
    {
        room: {
            type: Schema.Types.ObjectId,
            ref: "Room",
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        message: {
            type: String,
            required: true,
        }
    }
);

module.exports = mongoose.model("Message", Message);
