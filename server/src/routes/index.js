const UserRouter = require('./user.routes');
const RoomRouter = require('./room.routes');

function route(app) {
    app.use('/auth', UserRouter);
    app.use('/room', RoomRouter);
}
module.exports = route;