//lib
const express = require("express");
const app = new express();
const bodyParser = require("body-parser");
const session = require('express-session');
const MercadoPago = require('mercadopago');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');


//configurando mercado pago
MercadoPago.configure({
    sandbox: true, //modo de s desenvolvimento
    access_token: 'TEST-6594637210271734-032312-aa00cfef0f5da829baa85406a4988eab-215259488'
});

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
app.use(session({
    secret: '6594637210271734-032312-aa00cfef0f5',
    resave: true,
    saveUninitialized: true
}))
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

//404
app.get("*", (req, res) => {
    res.redirect("/home")
})

// rodando servidor
app.listen(3333, () => {
    console.log('servidor rodando')
})