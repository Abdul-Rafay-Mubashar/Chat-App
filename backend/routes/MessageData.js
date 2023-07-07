const express = require('express')
const Router = express.Router()
const Message = require('../Schemas/Message')
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const logins = require("../middleware/login")
const Secret = "Harryisa$goodboy";


Router.post("/AddMessage", logins, async (req, res) => {

    try {
        const friendid = req.body
        const userid = req.user.id
        // console.log(friendid,userid)
        const send = await Message.create({
            from: userid,
            to: friendid.to,
            msg: friendid.msg,
            time: friendid.Time
        })
        res.json(send)
    } catch (error) {
        console.log(error.msg)
    }
})

Router.post("/GetMessages", logins, async (req, res) => {

    try {
        const userid = req.user.id
        const friendid = req.body.id
        // console.log(userid,friendid)
        const Check = await Message.find({
            $or: [
                { from: userid, to: friendid },
                { from: friendid, to: userid }
            ]
        });
        //   console.log(Check)
        res.json(Check)
    } catch (error) {
        console.log(error.msg)
    }
})

Router.post("/GetCal", logins, async (req, res) => {

    try {

        const array = req.body[0];
        const array2 = req.body[1];

        // console.log(array+"This ")
        var i = 0;
        var ResArray = []
        while (i < array.length) {
            console.log("This Is")

            const Check = await Message.find({ from: array[i].to, to: array[i].from });

            // console.log(Check)
            var j = 0;
            var k = 0;
            while (j < Check.length) {
                if (Check[j].time > array[i].time) {
                    k++;
                }
                j++;
            }
            // const timestamp = array[i].time;
            // const date = new Date(timestamp);
            // const time = date.toLocaleTimeString();

            // console.log(time,array[i].time);
            const obj = {
                no: k,
                _id: array[i].to,
                time: array[i].time
            }
            ResArray.push(obj)
            // console.log(ResArray)
            i++;
        }
        i=0;

        while(i<array2.length)
        {
            console.log("This")

            const Check = await Message.find({ to: array2[i].to, from: array2[i].from });
            // console.log(Check.length)

            var j=Check.length;

            const obj = {
                no: j,
                _id: array2[i].from,
                time: array2[i].time
            }

            ResArray.push(obj)
            i++;

        }

        res.json(ResArray)
    } catch (error) {
        console.log(error.msg)
    }
})

module.exports = Router;