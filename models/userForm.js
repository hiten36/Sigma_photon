const mongoose =require('mongoose');
const validator=require('validator');

const mySchema = mongoose.Schema({
    name:{
        type:String,
        lowercase:true,
    },
    email:{
        type: String,
        validate(value)
        {
            if(!validator.isEmail(value))
            {
                throw new Error("Invalid Email.");
            }
        }
    },
    phone:{
        type:String,
        minlength:10
    },
    message:String
})

const UserForm=mongoose.model("UserForm",mySchema);

module.exports=UserForm;