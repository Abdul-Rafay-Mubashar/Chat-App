const mongoose  = require("mongoose")

const {Schema} =mongoose
const LoginInfo = new Schema({
    from:{
        type:String,
        require:true,
    },
    to:{
        type:String,
        require: true,
    },
    time:{
        type:String,
        require: true,  
    },
    term:{
        type:Number,
        require:true
    }
})
// const user1=mongoose.model('user',UserInfo)
// user1.createIndexes();
// module.exports =user1;
module.exports=mongoose.model('Login',LoginInfo)