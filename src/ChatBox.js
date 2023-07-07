import React, { useEffect, useState } from 'react'
import io, { Socket } from "socket.io-client"
import { useHistory } from 'react-router-dom';



const ENDPOINT = 'http://localhost:5000'
var socket, comparechatcompleted;
var friend;

export default function ChatBox(props) {
    var authCode = JSON.parse(localStorage.getItem("Auth-Code"));
    authCode = authCode.authtoken
    var friid = props.fri._id
    var users = JSON.parse(localStorage.getItem("Yourself"));
    console.log(users, authCode)
    var use;
    const [msg, setMsg] = useState(null)
    const [message, setMessage] = useState([])
    const [a, seta] = useState(null)

    const [friend, setFriend] = useState(null)
    const [Check, setCheck] = useState(false)
    const [Typing, setTyping] = useState(false)
    const [isTyping, setisTyping] = useState(false)
    const [name, setName] = useState(null)
    const [id, setId] = useState(null)
    const history = useHistory()

    // useEffect(()=>{
    //     console.log(isTyping,Typing,Check,friend,message,msg)


    // })
    const user_get = async () => {
        const Check = await fetch('http://localhost:5000/api/User/GetUser', {
            method: "post",
            headers: {
                "auth-token": authCode
            },
        })
        const response = await Check.json()
        use = response.name
        setId(response._id)
        seta(use)
        console.log(response,id)
    }
    useEffect(() => {

        user_get()
        socket = io(ENDPOINT)
        socket.emit("setup", users)
        socket.on('connection', () => {

        })
        socket.on('Typing', (name) => {
            setName(name);

            setisTyping(true);
            console.log(name)
            setInterval(() => {
                var element = document.getElementsByClassName("Chat_Box_Main")[0];

                element.scrollTop = element.scrollHeight;

            }, 20);

        })
        socket.on('New Message', (id, msg) => {
            get_Msg()

            // const data = {
            //     from:id,
            //     msg:msg
            // }

            // var cha=[]
            // message.push(data)
            // console.log(message)
            // const updatedMessage = message;   

            // setMessage(updatedMessage)
            // setCheck(false)
            // // setCheck(true)
            // // if(updatedMessage===message)
            // // {
            //     setCheck(true)
            // // }


        })
        socket.on('Stop Typing', () => { setisTyping(false) })

    }, [])
    const goback = async() => {
        var timenow = new Date().getTime();
        console.log(a,id)
        const Friend={
            from:id,
            time:timenow,
            to:friid
        }
        console.log(Friend)
        const fetch_user = await fetch("http://localhost:5000/api/Login/AddLatest", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(Friend)
          });
          const response = await fetch_user.json();
        console.log(response)
        history.goBack()

        window.location.reload()
    }
    const get = async () => {

    }
    const get_Msg = async () => {

        const send = {
            id: friid,
        }
        console.log(send, friid,)
        const Check = await fetch('http://localhost:5000/api/Message/GetMessages', {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "auth-token": authCode
            },
            body: JSON.stringify(send)
        })
        const response = await Check.json()
        console.log(response)
        setMessage(response)
        setCheck(true)

        var element = document.getElementsByClassName("Chat_Box_Main")[0];

        element.scrollTop = element.scrollHeight;
        comparechatcompleted = message
        const Data = {
            user: users._id,
            friend: friid
        }
        console.log(Data)
        const fetch_user = await fetch("http://localhost:5000/api/Friend/GetFriendonly", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "auth-token": authCode

            },
            body: JSON.stringify(Data)
        });
        const responseq = await fetch_user.json();
        console.log(responseq._id)
        setFriend(responseq)
        socket.emit("join chat", responseq._id)

    }
    useEffect(() => {
        get_Msg()
        var element = document.getElementsByClassName("Chat_Box_Main")[0];

        element.scrollTop = element.scrollHeight;
    }, [msg])
    const add_message = async () => {
        var TimeNow = new Date().getTime();

        if (msg == null) {
            return
        }
        const send = {
            to: friid,
            msg: msg,
            Time: TimeNow
        }
        console.log(send, friid,)
        const Check = await fetch('http://localhost:5000/api/Message/AddMessage', {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "auth-token": authCode
            },
            body: JSON.stringify(send)
        })
        const response = await Check.json()
        console.log(response)
        document.getElementsByClassName('Type_Msg')[0].value = ""
        setMsg(null)
        socket.emit('Stop Typing', friend._id)
        socket.emit("New Message", friend._id, friid, msg)
        const data = {
            to: friid,
            msg: msg
        }
        message.unshift(data)
    }
    var i = 100;

    // const Slider=()=>{
    //     document.getElementsByClassName('For_Height')[0].style.height=i+'vh'
    //     i=i-4;
    //     if(i===0)
    //     {
    //         document.getElementsByClassName('For_Height')[0].style.display="none"
    //         i=100
    //         clearInterval(cle)

    //     }
    // }
    const typing = (event) => {
        setMsg(event.target.value)
        var timestamp = 1688218588853;
        var date = new Date(timestamp);
        var formattedDate = date.toLocaleString();

        console.log(date,formattedDate);
        // var options = { 
        //     year: 'numeric', 
        //     month: 'long', 
        //     day: 'numeric', 
        //     hour: 'numeric', 
        //     minute: 'numeric', 
        //     second: 'numeric' 
        //   };

        //   var TimeNow = new Date().toLocaleString(undefined, options);
        //   console.log(TimeNow);
        console.log(users)

        console.log(a, name)
        if (!Typing) {
            setTyping(true)
            console.log(friend, a)
            socket.emit("Typing", friend._id, a)
        }
        let LastTime = new Date().getTime()
        var timerlength = 3000
        setTimeout(() => {
            var TimeNow = new Date().getTime();
            var TimeDiff = TimeNow - LastTime
            if (TimeDiff >= timerlength && Typing) {
                setTyping(false)
                socket.emit("Stop Typing", friend._id)
            }
        }, timerlength);
    }
    // var cle=setInterval(() => {
    //     Slider()
    // }, 10);
    return (
        <>
            {/* <div className='ChatBox_Outline'>

            </div>
            <div className='For_Height'>

            </div> */}
            <div className='ChatBox_Down'>
                <div className='ChatBox'>
                    <div className='Chat_Box_Header'>
                        {props.fri.name}
                        {isTyping === true ?
                            <div className='Small'>{name + " Is Typing"}</div> : null
                        }
                    </div>
                    <div className='Chat_Box_Main'>
                        {Check === true ? (
                            message.map((res, index) => {
                                if (res.to === friid) {
                                    return (
                                        <div className='Chat_Box_Msg_Box2'>
                                            <div className='Chat_Box_Msg2'>
                                                {res.msg}
                                            </div>
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div className='Chat_Box_Msg_Box'>
                                            <div className='Chat_Box_Msg'>
                                                {res.msg}
                                            </div>
                                        </div>
                                    );
                                }
                            })
                        ) : null}
                        {isTyping === true ?
                            <div className='Chat_Box_Msg_Box22'>
                                <div class="Chat_Box_Msg22">
                                    <div class="typing-indicator">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            </div> : null
                        }
                    </div>
                    <div className='Chat_Box_Footer'>
                        <div className='Msg_Bar'>
                            <input className='Type_Msg' type='text' placeholder='Type a Message' onChange={typing}>
                            </input>
                        </div>
                        <div className='Button_Bar'>
                            <button className='Cencel_Chat' onClick={goback}>
                                Cencel
                            </button>
                            <button className='Send_Chat' onClick={add_message}>
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}