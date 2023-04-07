
const userController = {}
const User = require('../Models/user')
const bcrypt = require('bcryptjs')
const saltRounds = 10;
const passport = require('passport')

userController.register = async (req, res) => {
    const { username, password } = req.body
    try {

        if (!username || !password) {
            throw 'all fields required'
        }

        //  const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await User.User.create({ username, password })

        return res.redirect('/users/login')
        //  return res.send({message:"User created successfully"})
    } catch (error) {
        res.redirect('/')
        console.log(error)
    }
}

userController.login = async (req, res) => {
    return res.render('login')
}

userController.logout = async (req, res) => {
    req.logout(function (err) {
        if (err) return next(err);
    });
    return res.redirect('/users/login');

}

module.exports = userController