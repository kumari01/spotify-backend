const userModel = require('../Models/user.model');
const jsonwebtoken = require('jsonwebtoken');
const cookie = require('cookie-parser');
async function registerUser(req,res) {
    const {username, email,password,role} = req.body;

    const isUserExist = await userModel.findOne({
        $or : [
            { username},
            { email}
        ]
    })
    if (isUserExist) {
        return res.status(409).json({
            message : 'User already exists'
        })
    }

    const user = await userModel.create({
        username,
        email,
        password,
        role
    });
    const token = jsonwebtoken.sign({id:user._id, role : user.role}, process.env.JWT_SECRET);
    res.cookie('token', token)

    return res.status(201).json({
        message : 'User created successfully',
        user,
        token
    });

}


module.exports = {registerUser}