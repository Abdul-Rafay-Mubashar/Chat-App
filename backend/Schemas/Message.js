const mongoose  = require("mongoose")

const {Schema} =mongoose
const MessageInfo = new Schema({
    from:{
        type:String,
        require:true,
    },
    to:{
        type:String,
        require: true,
    },
    msg:{
        type:String,
        require: true,
    },
    date:{
        type:Date,
        default:Date.now
    },
    time:{
        type:String,
        require: true,
    }
})
// const user1=mongoose.model('user',UserInfo)
// user1.createIndexes();
// module.exports =user1;
module.exports=mongoose.model('Message',MessageInfo)