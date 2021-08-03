require('dotenv').config()
const express=require('express');
const exphbs=require('express-handlebars');
const path=require('path');
const bcrypt=require('bcrypt');
const cookieParser=require('cookie-parser');
require('./db/conn');
const userForm=require('./models/userForm');
const users=require('./models/users');
const auth=require('./middleware/auth');
const app=express();
const port=process.env.PORT || 8002;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'static')));
app.set('view engine','handlebars');
app.engine('handlebars',exphbs());

app.get('/',auth,(req,res)=>{
    if(req.err)
    {
        res.render('index',{userAuth:false});
    }
    else
    {
        res.render('index',{userAuth:true});
    }
    
})

app.post('/contact',async (req,res)=>{
    try {
        let nUserReq=new userForm({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            message:req.body.message
        });
        let resp=await nUserReq.save();
        res.render('index',{
            flag:true,
            color:"success",
            msg:"Your message has been sent successfully, We will get back to you soon! "
        })
    } catch (error) {
        res.render('index',{
            flag:true,
            color:"danger",
            msg:"Some error occured, Fill the form correctly or try again after sometime! "
        })
    }
})

app.post('/signin',async (req,res)=>{
    try {
        if(req.body.password==req.body.cpassword)
        {
            let checkUser=await users.findOne({email:req.body.email}).countDocuments();
            if(checkUser==0)
            {
                let nUser=new users({
                    email:req.body.email,
                    password:req.body.password
                })
                let resp=await nUser.save();
                res.render('index',{
                    flag:true,
                    color:"success",
                    msg:"Signin Success! You can login now. "
                })
            }
            else
            {
                res.render('index',{
                    flag:true,
                    color:"danger",
                    msg:"Signin Failed! Email already taken. "
                })
            }
        }
        else
        {
            res.render('index',{
                flag:true,
                color:"danger",
                msg:"Signin Failed! Password should be same in both columns, Re-enter your password. "
            })
        }
    } catch (error) {
        res.render('index',{
            flag:true,
            color:"danger",
            msg:"Signin Failed, Fill the details correctly or try again after some time. "
        })
    }
})

app.post('/login',async (req,res)=>{
    try {
        let user=await users.findOne({email:req.body.email});
        if(await bcrypt.compare(req.body.password,user.password))
        {
            const token=await user.generateAuthToken();

            res.cookie('jwt',token,{
                expires:new Date(Date.now()+99920000),
                httpOnly:true
            })

            res.render('index',{
                flag:true,
                color:"success",
                msg:`Login Success!`,
                login:true
            })
        }
        else
        {
            res.render('index',{
                flag:true,
                color:"danger",
                msg:"Login Failed! Invalid credentials, Recheck your password and try again. "
            })
        }
    } catch (error) {
        res.render('index',{
            flag:true,
            color:"danger",
            msg:"Login Failed, Invalid credentials, Recheck your password and try again. "
        })
    }
})

app.get('/gallery',auth,(req,res)=>{
    if(req.err)
    {
        res.render('gallery',{userAuth:false});
    }
    else
    {
        res.render('gallery',{userAuth:true});
    }
})

app.get('/logout',auth, async (req,res)=>{
    try {
        req.user.tokens=req.user.tokens.filter((e)=>{
            return e.token!=req.token;
        })
        res.clearCookie('jwt');
        await req.user.save();
        res.status(200).render('index',{
            flag:true,
            color:"success",
            msg:"Logout Successful! "
        })
    } catch (error) {
        res.status(401).render('index',{
            flag:true,
            color:"danger",
            msg:"Logout Failed, Something went wrong,try again later "
        })
    }
})

app.get('/a',async (req,res)=>{
    let resp=await userForm.find();
    res.send(resp);
})

app.get('/b',async (req,res)=>{
    let resp=await users.find();
    res.send(resp);
})

app.get('/contact',(req,res)=>{
    res.status(200).render('index');;
})

app.get('/signin',(req,res)=>{
    res.status(200).render('index');
})

app.get('/login',(req,res)=>{
    res.status(200).render('index');
})

app.listen(port,()=>{
    console.log('Listening at port ',port);
})