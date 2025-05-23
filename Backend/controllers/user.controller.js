const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blackListModel = require('../models/blacklistToken.model');

module.exports.registerUser = async (req, res, next)=>{
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password }= req.body;

    const isUserAlreadyExist = await userModel.findOne({ email });
    
    if(isUserAlreadyExist){
        return res.status(400).json({ message: 'User already exists'});
    }

    const hashPassword = await userModel.hashPassword(password);
    
   
    const user = await  userService.createUser({
        firstName : fullName.firstName,
        lastName : fullName.lastName,
        email,
        password: hashPassword
    })

    const token = user.generateAuthToken();

    res.status(201).json({ token, user });

}


module.exports.loginUser = async (req, res, next) => { 

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({email}).select('+password') // because bydefault we have make it false

    if(!user){
        return res.status(401).json({message: 'Invalid email or password'});
    }

    const isMatch = await user.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({message: 'Invalid email or password'});
    }

    const token = user.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({ token, user});
}


module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user);
}


module.exports.logoutUser = async (req, res, next)=>{
    res.clearCookie('token');

    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    await blackListModel.create({token});

    res.status(200).json({message : 'Logout successfully'});

}