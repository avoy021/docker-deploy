const User = require('../models/userModel')

const protectRoute = async(req,res,next) => {
    const {user} = req.session;
    if(!user) {
        return res.status(401).json({message:'Unauthorized'});
    }
    else{
        const {username} = user;
        const isPresent = await User.findOne({username});
        if(!isPresent) {
            return res.status(401).json({message:'Unauthorized'});
        }
        next();
    }
}

module.exports = protectRoute