const Msg = require('../models/Msg')
const Chat = require('../models/Chat')
const User = require('../models/User')

const create = async (req,res)=>{
    const codigo = req.body.codigo
    const msg = req.body.msg
    
    const chats = await Chat.findAll({ where: { codigo }})
    if(chats){
        chats.forEach(async chat=>{
            await Msg.create({
                chatId: chat.id,
                msg : msg,
                userId: req.session.user_id
            })
        })
    
        res.sendStatus(200)
    }else{
        res.sendStatus(400)
    }
   
}

const msgs = async (req, res)=>{
    const offset = req.params.offset
    const codigo = req.params.codigo

    const from = await Chat.findOne({ where: { userId : req.session.user_id, codigo: codigo  }})

    const msgs = await Msg.findAll({offset: parseInt(offset), where: { chatId: from.id }})

    res.statusCode = 200;
    res.json({id: req.session.user_id, msgs})

    await Msg.update({view: 1},{where: { chatid: from.id}})
}

const newMsg = async(req, res)=>{
    const name = req.params.user;
        
    const { id } = await User.findOne({ where: { name: name }})

    const codigo = id > req.session.user_id ? `${id}${req.session.user_id}` : `${req.session.user_id}${id}`

    const news = await Chat.findAll({
        include: [ { model: Msg, where:{ userId: id, view: 0 } } ],
        where: { codigo: codigo, userId: req.session.user_id}
    })

    if(news.length == 0){
        res.json({total: 0})
        return    
    }

    const total = news[0].msgs.length

    res.json({total: total})    
}

module.exports = {
    create,
    msgs,
    newMsg
}