const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const blackListModel = require('../models/blacklistToken.model');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];


    if(!token){
        return res.status(401).json({message : 'Unauthorized'});
    }


    const isBlackListed = await blackListModel.findOne({token: token});
 

    if(isBlackListed){

        return res.status(401).json(({message : 'Unauthorized'}));
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        req.user = user;
        return next();

    }catch(err){
        console.log("userAuth - error",err);
        return res.status(401).json({message : 'Unauthorized'});
    }

}

