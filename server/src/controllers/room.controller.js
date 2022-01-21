const Room = require('../models/room.models');
class RoomController {
    async createChatroom(req, res) {
        const { name } = req.body;

        const nameRegex = /^[A-Za-z\s]+$/;

        if (!nameRegex.test(name)) throw "Chatroom name can contain only alphabets.";

        const chatroomExists = await Room.findOne({ name });

        if (chatroomExists) throw "Chatroom with that name already exists!";

        const chatroom = new Room({
            name,
        });

        await chatroom.save();

        res.json({
            message: "Chatroom created!",
        });
    };
    async show(req, res) {
        const room = await Room.find({});
        res.json(room);
    };
}
module.exports = new RoomController();