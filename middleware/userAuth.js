const User = require('../models/User')

function userAuth(req, res, next) {

    if(req.cookies.user_id){
        req.session.user_id = req.cookies.user_id
        next()
        return
    }

    if (req.session.user_id) {
        User.findOne({
            where: {
                id: req.session.user_id
            }
        }).then(user => {
            if (user) {
                next()
            } else {
                res.redirect("/login/logout")
            }

        })

    } else {
        res.redirect('/login')
    }

    
}



module.exports = userAuth