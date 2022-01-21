
const User = require("../models/user.models");
const Message = require("../models/message.models");
const jwt = require("jwt-then");
function serverIO(app) {
    const port = process.env.PORT || 3333;
    const server = app.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`);
    });
    const io = require("socket.io")(server, {
        allowEIO3: true,
        cors: {
            origin: true,
            methods: ['GET', 'POST'],
            credentials: true
        }
    });

    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.query.token;
            const payload = await jwt.verify(token, process.env.SECRET);
            socket.userId = payload.id;
            next();
        } catch (err) { }
    });

    io.on("connection", (socket) => {
        console.log("Connected: " + socket.userId);

        socket.on("disconnect", () => {
            console.log("Disconnected: " + socket.userId);
        });

        socket.on("joinRoom", ({ chatroomId }) => {
            socket.join(chatroomId);
        });

        socket.on("leaveRoom", ({ chatroomId }) => {
            socket.leave(chatroomId);
        });

        socket.on("chatroomMessage", async ({ chatroomId, message }) => {
            const userId = socket.userId;
            if (message.trim().length > 0) {
                const user = await User.findOne({ _id: userId });
                const newMessage = new Message({
                    room: chatroomId,
                    user: userId,
                    message,
                });
                io.to(chatroomId).emit("newMessage", {
                    message,
                    name: user.name,
                    userId: userId,
                });
                await newMessage.save();
            }
        });
    });
}
module.exports = serverIO;