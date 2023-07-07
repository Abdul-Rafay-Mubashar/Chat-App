const express = require('express')
const Router = express.Router()
const User=require('../Schemas/User')
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const logins=require("../middleware/login")
const Secret="Harryisa$goodboy";

Router.post('/Create',[
    body("name","Name Is Too Short").isLength({min:5}),
    body("email","Enter Proper Email").isEmail(),
    body("password","Password Is Too Short").isLength({min:8})
], async (req, res) => {
    try {

    const errorsofbody = validationResult(req);
    if (!errorsofbody.isEmpty()) {
      return res.json({ errors: errorsofbody.array() });
    }
    const { email,name, password } = req.body
    // console.log(req.body.email)
    // console.log(email,name,password)
    const EmailVerify = await User.findOne({ email: req.body.email })
    if (EmailVerify) {
        return res.json(  {errors:{msg: "This Email Is Already Registered"}} )
    }
    const salt= await bcrypt.genSalt(10)
    const HashPassword=await bcrypt.hash(password,salt)
    const send = await User.create({
        name: name,
        email: email,
        password: HashPassword
    })
    console.log(send)
    const data={
        user:{
            id:send.id
        }
    }
    var authtoken = jwt.sign(data, Secret);
    res.json({authtoken})
}catch (error) {
    console.log(error.msg)
}
})


Router.post("/Login",async(req,res)=>{
    console.log(req.body.email)
    try {
        const Check=await User.findOne({email:req.body.email})
        if(!Check)
        {
            return res.status(400).json({errors:'Invalid Email Or Password'})
        }
        const passwordcheck=await bcrypt.compare(req.body.password,Check.password)
        if(!passwordcheck)
        {
            return res.status(400).json({errors:'Invalid Email Or Password'})
        }
        console.log(passwordcheck)
        const data={
            user:{
                id:Check.id
            }
        }
        var authtoken = jwt.sign(data, Secret);
        res.json({authtoken})

    } catch (error) {
        console.log(error.msg)
    }
})



Router.post("/GetUser",logins,async(req,res)=>{

    try {
        const userid=req.user.id
        const Check=await User.findOne({_id:userid}).select("-password")
        res.json(Check)
    } catch (error) {
        console.log(error.msg)
    }
})


Router.post("/GetUser/name",async(req,res)=>{

    try {
        const userid=req.body
        var i=userid.length
        var t=0;
        var array=[]
        while(t<i)
        {
            const Check = await User.findOne({ _id: userid[t].id}).select("-password");
            array.push(Check)
            t++;
        }
        res.json(array)
    } catch (error) {
        console.log(error.msg)
    }
})



Router.post("/Search",async(req,res)=>{
    try {
      const searchValue = req.body.search;
      const query = {
        name: { $regex: `^${searchValue}`, $options: 'i' }
      };
      var results = await User.find(query).exec();
      if(results.length===0)
      {
            const query = {
            email: { $regex: `^${searchValue}`, $options: 'i' }
          };
          results = await User.find(query).exec();
      }
      console.log(results);
      res.json(results);
    } catch (error) {
      res.json({ errors: error.message });
    }
  });


module.exports = Router;