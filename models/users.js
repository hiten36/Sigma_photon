const mongoose =require('mongoose');
const validator=require('validator');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const mySchema = mongoose.Schema({
    email:{
        type: String,
        unique:true,
        validate(value)
        {
            if(!validator.isEmail(value))
            {
                throw new Error("Invalid Email.");
            }
        }
    },
    password:String,
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
})

mySchema.methods.generateAuthToken=async function()
{
    try {
        let token=jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (error) {
        res.render('index');
    }
}

mySchema.pre("save",async function(next){
    if(this.isModified("password"))
    {
        this.password=await bcrypt.hash(this.password,12);
    }
    next();
})

const User=mongoose.model("User",mySchema);

module.exports=User;