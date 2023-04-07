

const isLoggedIn = (req,res,next)=>{

    if(!req.user){
        res.redirect('/')
     }

     next()
}

module.exports = isLoggedIn