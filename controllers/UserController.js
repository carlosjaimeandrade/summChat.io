const User = require('../models/User')
const bcrypt = require("bcryptjs")
const nodemailer = require('nodemailer');


const logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login')
    })
}

const login = (req, res) => {
    res.render('user/login', {
        message: req.flash('message'),
        type: req.flash('type')
    })
}

const loginCheck = async(req, res) => {
    const email = req.body.email
    const password = req.body.password

    const user_sucess = await User.findOne({ where: { email: email } })

    if (user_sucess) {
        const correct = bcrypt.compareSync(password, user_sucess.password)
        if (correct) {
            req.session.user_id = user_sucess.id
            req.session.remoteAddress = req.connection.remoteAddress

            //apenas em desenvolvimento
            res.cookie("user_id", user_sucess.id, { maxAge: 99960000 });

            res.redirect('user/assinatura')
        } else {
            req.flash('message', 'Erro de autenticação, verifique os dados e tente novamente');
            req.flash('type', 'danger');
            res.redirect("login")
        }
    } else {
        req.flash('message', 'Erro de autenticação, verifique os dados e tente novamente');
        req.flash('type', 'danger');
        res.redirect("login")
    }
}

const loginNew = (req, res) => {
    res.render('user/loginNew', {
        message: req.flash('message'),
        type: req.flash('type')
    })
}

const loginNewSend = async(req, res) => {
    req.session.name = req.body.name
    req.session.email = req.body.email
    req.session.telephone = req.body.telephone
    req.session.password = req.body.password

    const email = req.body.email

    if (email.toLowerCase().includes('hotmail') == false) {
        if (email.toLowerCase().includes('gmail') == false) {
            if (email.toLowerCase().includes('outlook') == false) {
                if (email.toLowerCase().includes('yahoo') == false) {
                    req.flash('message', 'Por questão de segurança esse e-mail não é permitido, por favor entre em contato atravez do número 35 9 98308037');
                    req.flash('type', 'danger');
                    res.redirect('/login/new')
                }
            }
        }
    }


    const user = await User.findOne({
        where: {
            email: email
        }
    })

    if (user) {
        req.flash('message', 'Esse email já possui cadastro, escolha outro');
        req.flash('type', 'danger');
        res.redirect('/login/new')
    } else {

        const transporter = nodemailer.createTransport({
            host: "smtp.titan.email",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: "confimacao@fmsoficial.com.br",
                pass: "13061981608Ca"
            },
            tls: { rejectUnauthorized: false }
        });

        let aleatorio = (Math.floor(Math.random() * 1066645 + 1))
        const codigo = aleatorio.toString()

        req.session.codigo = codigo
        const mailOptions = {
            from: 'confimacao@fmsoficial.com.br',
            to: email,
            subject: 'Confirmação de cadastro',
            text: codigo
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                res.send(error)
            } else {
                res.redirect('/login/new/confirm')
            }
        });

    }

}

const loginConfirm = async(req, res) => {
    if (req.session.codigo) {
        res.render('user/loginConfirm')
    } else {
        res.redirect('/login')
    }

}

const loginConfirmSend = async(req, res) => {
    const cod = req.body.cod

    let teste = new Date()
    teste.setHours(teste.getHours() - 2);

    if (cod == req.session.codigo) {
        const salt = bcrypt.genSaltSync(10, req.session.password)
        const hash = bcrypt.hashSync(req.session.password, salt)
        const sucessCreate = await User.create({
            name: req.session.name,
            email: req.session.email,
            telephone: req.session.telephone,
            password: hash,
            plan: 0,
            day_plan: 0,
            teste_date: teste
        })

        if (sucessCreate) {
            req.flash('message', 'Cadastro realizado com sucesso, faça o login (:');
            req.flash('type', 'success');
            req.session.codigo = null
            res.redirect('/login')
        }
    } else {
        req.flash('message', 'Código inválido, por segurança refaça o processo novamente');
        req.flash('type', 'danger');
        req.session.codigo = null
        res.redirect('/login/new')
    }
}

module.exports = {
    logout,
    login,
    loginCheck,
    loginNew,
    loginNewSend,
    loginConfirm,
    loginConfirmSend
}