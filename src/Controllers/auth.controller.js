const userModel = require('../Models/user.model');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


async function registerUser(req,res) {
    const {username, email,password,role} = req.body;

    const isUserExist = await userModel.findOne({
        $or : [
            { username},
            { email}
        ]
    })
    const hash = await bcrypt.hash(password,10)
    if (isUserExist) {
        return res.status(409).json({
            message : 'User already exists'
        })
    }

    const user = await userModel.create({
        username,
        email,
        password:hash,
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


async function LoginUser(req,res){
    const {username, email, password} = req.body;

    const user = await userModel.findOne({
        $or :[
            {username},
            {email}
        ]
    })
    if (!user){
        return res.status(404).json({
            message :"Invaild credentials"
        })
    }
    const isPasswordvalid = await bcrypt.compare(password, user.password);

    if (!isPasswordvalid){
        return res.status(404).json({
            message :"Invaild credentials"
        })
    }
    const token = jsonwebtoken.sign(
        {id:user._id, role : user.role}, process.env.JWT_SECRET
    )
    res.cookie('token', token)
    return res.status(200).json({
        message : 'Login successful',
        username : user.username,
        email : user.email,
        role : user.role,
        token
    })
}

module.exports = { registerUser, LoginUser }