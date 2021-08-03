const jwt=require('jsonwebtoken');
const users=require('../models/users');

async function auth(req,res,next)
{
    try {
        let token=req.cookies.jwt;
        let verifyUser=jwt.verify(token,process.env.SECRET_KEY);
        let user=await users.findOne({_id:verifyUser._id});
        req.token=token;
        req.user=user;
        req.err=false;
        next();
    } catch (error) {
        req.err=true;
        next();
    }
}
module.exports=auth;