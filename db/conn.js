const mongoose=require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/website1',{useCreateIndex:true,useFindAndModify:false,useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log('Database connected..');
}).catch((error)=>{
    console.log(error);
});