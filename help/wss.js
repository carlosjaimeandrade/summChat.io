const { io } = require('./http')
const {Op} = require('sequelize')
const User = require('../models/User')
const Msg = require('../models/Msg')
const Chat = require('../models/Chat')

const wss = (userSession) => {
    const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);

    io.use(wrap(userSession));

    io.use((socket, next) => {
        const session = socket.request.session;
        socket.join(session.codigo)
        socket.join(session.name)
        console.log(socket.rooms)
        next()
    });


    io.on('connection', (socket) => {

        console.log(`socket rodando id: ${socket.id} `)

        socket.on('message', data => {
            socket.to(data.codigo).emit("newMsg", data)
        })

        socket.on('viewMsg', async data=>{
            const chats = await Chat.findAll({ where: {codigo: data.codigo}})
            chats.forEach(async chat=>{
                await Msg.update({view: 1},{ where: { chatId: chat.id, userId : {[Op.ne]:  socket.request.session.user_id }}})
            })
            socket.to(data.codigo).emit("viewMsg", data)
        })
    
        socket.on('typing', data => {
            socket.to(data.codigo).emit("typing", "digitando....")
        })

        socket.on('online',async ()=>{
            await User.update({ status: "online" },{ where:{ id: socket.request.session.user_id}})
            const users = await User.findAll({attributes: ['name', 'status']})
            socket.broadcast.emit('online',users)
            socket.emit('online',users)
        })

        socket.on('disconnect', async function() {
            await User.update({ status: "offline" },{ where:{ id: socket.request.session.user_id}})
            const users = await User.findAll({attributes: ['name', 'status']})
            socket.broadcast.emit('online',users)
            socket.emit('online',users)
        });
    })
}

module.exports = wss