import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';



export default function Login() {
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [Checkpassword, setCheckPassword] = useState(null)
    const [ResMsg, setResMsg] = useState(false)
    const [Msg, setMsg] = useState(false)
    const [passwordVeri, setPasswordVeri] = useState(false)
    const history=useHistory()

    const Sign_Up=async()=>{
        const send={
            name:name,
            email:email,
            password:password
        }
        console.log(send)
        const Go=await fetch("http://localhost:5000/api/User/Create",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(send)
        })
        const response=await Go.json()
        console.log(response)
        if(response.errors===undefined)
        {
            setResMsg(true)
            setMsg("Sign Up Sucessfully")
            localStorage.setItem("Auth-Code",JSON.stringify(response))
            history.push('/Profile')
            window.location.reload()

        }
        else{
            setResMsg("ok")

            if(response.errors.msg===undefined)
            {
                setMsg(response.errors[0].msg)
            }
            else{
                setMsg(response.errors.msg)
            }
        }
    }
    useEffect(() => {
        if(password===""||password===null)
        {
            return
        }
        if (Checkpassword === null) {
            return
        }
        console.log(Checkpassword, password)

        if (Checkpassword === password) {
            setPasswordVeri("ok")
        }
        else {
            setPasswordVeri(true)
        }
    }, [Checkpassword])
    const Login=()=>{
        history.push('/')
        window.location.reload()
    }
    return (
        <>
            <div className='Login_BackGround'>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmd_hGpOmbi8t_4PxnpSGHHpgR6Dc3Re2UWw&usqp=CAU' className='Login_Com1_Pic'/>
            </div>
            <div className='Login_Real'>
                <div className='Login_Com'>
                    <div className='Login_Com1'>
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmd_hGpOmbi8t_4PxnpSGHHpgR6Dc3Re2UWw&usqp=CAU' className='Login_Com1_Pic'/>

                    </div>
                    <div className='Login_Com1'>
                        <div className='Login_Form'>
                            {ResMsg===true?
                                <div className='SignUp_Message'>
                                    {Msg}
                                </div>:ResMsg==="ok"?
                                <div className='SignUp_Message1'>
                                    {Msg}
                                </div>:null
                            }
                            <div className='SignUp_Form_Inside'>
                                <div className='Login_Form_Inside_Heading'>
                                    SIGN UP
                                </div>
                                <div className='Login_Form_Inside_User'>
                                    <div className='Login_Form_Inside_User_Pic'>
                                        <img src='https://img.uxwing.com/wp-content/themes/uxwing/download/peoples-avatars-thoughts/user-icon.png' alt='pic' className='User_Pic_Com' />
                                    </div>
                                    <input className='Login_Form_Inside_Use_Input1' placeholder='Name' onChange={(event) => { setName(event.target.value) }}></input>
                                </div>
                                <div className='Login_Form_Inside_User'>
                                    <div className='Login_Form_Inside_User_Pic'>
                                        <img src='https://cutewallpaper.org/24/envelope-icon-png/envelope-icon-png-and-svg-vector-free-download.png' alt='pic' className='User_Pic_Com' />
                                    </div>
                                    <input className='Login_Form_Inside_Use_Input1' placeholder='Email' onChange={(event) => { setEmail(event.target.value) }}></input>
                                </div>
                                <div className='Login_Form_Inside_Password'>
                                    <div className='Login_Form_Inside_User_Pic'>
                                        <img src='https://www.freeiconspng.com/thumbs/lock-icon/lock-icon-21.png' alt='pic' className='User_Pic_Com' />
                                    </div>
                                    <input className='Login_Form_Inside_Use_Input' placeholder='Password' onChange={(event) => { setPassword(event.target.value) }}></input>
                                </div>
                                <div className='Login_Form_Inside_Password'>
                                    <div className='Login_Form_Inside_User_Pic'>
                                        <img src='https://creazilla-store.fra1.digitaloceanspaces.com/icons/3206575/confirm-circle-icon-md.png' alt='pic' className='User_Pic_Com' />
                                    </div>
                                    <input className='Login_Form_Inside_Use_Input' placeholder='Confirm Password' onChange={(event) => { setCheckPassword(event.target.value) }}></input>

                                </div>
                                <div className='Login_Line'>
                                    {passwordVeri === true ?
                                        <div className='Login_Line_Base1'>
                                            Password Not Match
                                        </div> : passwordVeri === "ok" ?
                                        <div className='Login_Line_Base2'>
                                            Password Match
                                        </div> : null
                                    }
                                </div>
                                <div className='Forget1'></div>
                                <div className='Login_Button_Outline'>
                                    <div className='Login_Button' onClick={Sign_Up}> SIGN UP</div>
                                </div>
                                <div className='Login_Line'>
                                    <div className='Login_Line_Base'>
                                        Already Have a Account
                                    </div>
                                    <div className='Login' onClick={Login}>
                                        Log in
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
