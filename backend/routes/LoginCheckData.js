const express = require('express')
const Router = express.Router()
const LoginCheck = require('../Schemas/LoginCheck')
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const logins = require("../middleware/login")
const Secret = "Harryisa$goodboy";


Router.post("/AddLatest", async (req, res) => {
  try {
    const friendid = req.body;
    const userid = req.body.from;
    console.log(req.body + "This");
    const Check = await LoginCheck.findOne({ from: userid, to: req.body.to });;
    const Check2 = await LoginCheck.findOne({ to: userid, from: req.body.to,term:1 });
    if(Check2)
    {

      const obj={
        from:Check2.from,
        to:Check2.to,
        time:Check2.time,
        term:2
      }
      const last = await LoginCheck.findOneAndDelete({ to: userid, from: req.body.to,term:1 });
      const ok = await LoginCheck.create({
        from:obj.from,
        to:obj.to,
        time:obj.time,
        term:obj.term
      })
    }


    if (!Check) {
      const send = await LoginCheck.create({
        from: userid,
        to: friendid.to,
        time: friendid.time,
        term:1
      });
      res.json(send);
    }

    else {
      var i=Check.term;
      const Check2 = await LoginCheck.findOne({ to: userid, from: req.body.to });
      if(Check2)
      {
        i++;
      }
      else{
        i=Check.term
      }
      const send = await LoginCheck.findOneAndDelete({ from: userid, to: req.body.to });
      const send1 = await LoginCheck.create({
        from: userid,
        to: friendid.to,
        time: friendid.time,
        term:i

      });

      res.json(send1);
      console
    }
  } catch (error) {
    console.log(error.message);
  }
});


Router.post("/GetOfUser", async (req, res) => {
  try {
    const userid=req.body.id
    // console.log(userid)

    const Run = await LoginCheck.find({ from: userid });
    const Check2 = await LoginCheck.find({ to: userid,term:1 });;
    console.log(Run,Check2)
    const array=[Run,Check2]
    res.json(array)
    var last=[]
    last=Run;
    // var i=0;
    // while(i<Check2.length)
    // {
    //   var j=0;
    //   var k=0;
    //   while(j<Run.length)
    //   {
    //     if(Check2[i].from===Run[j].to)
    //     {
    //       k=1
    //     }
    //     j++;
    //   }
    //   if(k===0)
    //   {
    //     last.push(Check2[i])
    //   }
    //   i++;
    // }
    // console.log(last+"Thsi")
    
    // res.json(last)
    // console.log(Run,Check2,array)
  } catch (error) {
    console.log(error.message);

  }
});


module.exports = Router;