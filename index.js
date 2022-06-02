//lib
const express = require("express");
const app = new express();
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const server = require("http").createServer(app);
const io = require('socket.io')(server);

//model
const User = require('./models/User')
const Chat = require('./models/Chat')
const Msg = require('./models/Msg')

//configurando o view engine
app.set('view engine', 'ejs');

// configurando o bory parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//configurando os arquivos staticos
app.use(express.static('public'))

//configurando session
const userSession = session({
    secret: '6594637210271734-032312-aa00cfef0f5',
    resave: true,
    saveUninitialized: true,
    name: "key"
})
app.use(userSession
    )
app.use(cookieParser());

//configurando msg flash
app.use(flash());


//rotas
const UserRoutes = require('./routes/user')
const HomeRoutes = require('./routes/home')
const ChatRoutes = require('./routes/chat')
const ApiRoutes = require('./routes/api')

app.use("/", UserRoutes)
app.use("/", HomeRoutes)
app.use("/", ChatRoutes)
app.use("/", ApiRoutes)

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

    socket.on('typing', data=>{
        socket.to(data.codigo).emit("typing", "digitando....")
    })


})



//404
app.get("*", (req, res) => {
    res.redirect("/home")
})

// rodando servidor
server.listen(3333, () => {
    console.log('servidor rodando')
})