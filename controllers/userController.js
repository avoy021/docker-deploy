const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const signup = async(req,res) => {
    const {username,password} = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password,salt);
        const user = await User.create({
            username,
            password : hashPass
        });

        if(user) {
            req.session.user = user;
            return res.json(user);
        }
    } catch (error) {
        return res.json({
            message:'Signup failed'
        })
    }
}
const login = async(req,res) => {
    const {username,password} = req.body;
    try {
        const user = await User.findOne({username});
        const isCorrect = await bcrypt.compare(password,user.password);

        if(isCorrect) {
            req.session.user = user;
            return res.json({
                message : "Log In successful",
                body : user
            });
        }
    } catch (error) {
        return res.json({
            message:'Login failed'
        })
    }
}



module.exports = {
    signup,
    login
}