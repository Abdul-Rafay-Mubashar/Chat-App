const mongoose  = require("mongoose")

const {Schema} =mongoose
const UserInfo = new Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require: true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    date:{
        type:Date,
        default:Date.now
    }
})
// const user1=mongoose.model('user',UserInfo)
// user1.createIndexes();
// module.exports =user1;
module.exports=mongoose.model('User',UserInfo)