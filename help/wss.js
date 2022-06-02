const { io } = require('./http')

const wss = (userSession) => {
    const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);

    io.use(wrap(userSession));

    io.use((socket, next) => {
        const session = socket.request.session;
        socket.join(session.codigo)
        console.log(socket.rooms)
        next()
    });

    io.on('connection', (socket) => {

        console.log(`socket rodando id: ${socket.id} `)

        socket.on('message', data => {
            socket.to(data.codigo).emit("newMsg", data.msg)
        })

        socket.on('typing', data => {
            socket.to(data.codigo).emit("typing", "digitando....")
        })
    })
}

module.exports = wss