const express = require('express')
const Router = express.Router()
const Friend=require('../Schemas/Friend')
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const logins=require("../middleware/login")
const Secret="Harryisa$goodboy";


Router.post("/AddFriends",logins,async(req,res)=>{

    try {
        const friendid=req.body.Friends
        const userid=req.user.id
        // console.log(friendid,userid)
        const Check = await Friend.findOne({
            $or:[ 
                 {name: userid,friends : friendid},
                 {name: friendid,friends : userid}
                ]
            });
        // console.log(Check)
          if(Check){
            return res.json("Already Friends")
          }
        const send = await Friend.create({
            name: userid,
            friends: friendid,
        })

        
        res.json("New Friends")
    } catch (error) {
        console.log(error.msg)
    }
})

Router.post("/GetFriends",logins,async(req,res)=>{

    try {
        const userid=req.user.id
        console.log(userid)
        
        const Check1 = await Friend.find({ name: userid }).select('-_id -name');
        const Check2 = await Friend.find({ friends: userid }).select('-_id -friends');
        // console.log(Check1,Check2)
        var Check=[]
        var i=Check1.length;
        var j=Check2.length;
        var k=0;
        while(k<i)
        {
            var id={
                id:Check1[k].friends
            }
            Check.push(id)
            k++;
        }
        // console.log(Check1)
        k=0;
        while(k<j)
        {
            var id={
                id:Check2[k].name
            }
            Check.push(id)
            k++;
        }
        // console.log(Check)
        res.json(Check)
        // console.log(Check)
    } catch (error) {
        console.log(error.msg)
    }
})

Router.post("/GetFriendonly",logins,async(req,res)=>{

    try {
        const user={
            users:req.body.user,
            friend:req.body.friend
        }
        // console.log(user)
        const End=await Friend.findOne({
            $or: [
              { name: user.users, friends: user.friend },
              { name: user.friend, friends: user.users }
            ]
          });
        //   console.log(End)

        // const Check1 = await Friend.find({ name: userid });
        // const Check2 = await Friend.find({ friends: userid });
        // // console.log(Check1,Check2)
        // var Check=[]
        // var i=Check1.length;
        // var j=Check2.length;
        // var k=0;
        // while(k<i)
        // {
        //     var id={
        //         id:Check1[k].friends
        //     }
        //     Check.push(id)
        //     k++;
        // }
        // // console.log(Check1)
        // k=0;
        // while(k<j)
        // {
        //     var id={
        //         id:Check2[k].name
        //     }
        //     Check.push(id)
        //     k++;
        // }
        // // console.log(Check)
        res.json(End)
        // // console.log(Check)
    } catch (error) {
        console.log(error.msg)
    }
})

module.exports = Router;