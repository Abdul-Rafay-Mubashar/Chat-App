const mongoose  = require("mongoose")

const {Schema} =mongoose
const FriendInfo = new Schema({
    name:{
        type:String,
        require:true,
    },
    friends:{
        type:String,
        require: true,
    },
})
// const user1=mongoose.model('user',UserInfo)
// user1.createIndexes();
// module.exports =user1;
module.exports=mongoose.model('Friend',FriendInfo)