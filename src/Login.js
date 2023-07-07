import React, { useState } from 'react'
import Image from './Image';
import { useHistory } from 'react-router-dom';



export default function Login() {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [Msg, setMsg] = useState(null)
    const [Check, setCheck] = useState(null)
    const history=useHistory()

    const storedAuthCode = JSON.parse(localStorage.getItem("Auth-Code"));
    if(storedAuthCode)
    {
        history.push('/Profile')
        window.location.reload()
    }
    const Login=async()=>{
        const send={
            email:email,
            password:password
        }
        console.log(send)
        if(email===null||password===null|| email===""||password==="" )
        {
            return
        }
        const go=await fetch("http://localhost:5000/api/User/Login",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(send)
        })
        const response=await go.json()
        console.log(response)
        if(response.errors===undefined)
        {
            setMsg("Login Succesfully")
            setCheck(true)
            localStorage.setItem("Auth-Code",JSON.stringify(response))
            history.push('/Profile')
            window.location.reload()
        }
        else
        {
            setMsg(response.errors)
            setCheck(false)
        }
    }
    const SignUp=()=>{
        history.push('/SignUp')
        window.location.reload()
    }
    return (
        <>
            <div className='Login_BackGround'>
                <Image />
            </div>
            <div className='Login_Real'>
                <div className='Login_Com'>
                    <div className='Login_Com1'>
                    {/* <Image/> */}

                    </div>
                    <div className='Login_Com1'>
                        <div className='Login_Form'>
                            {Check===true?
                            <div className='Login_Message'>
                                {Msg}
                            </div>:Check===false?
                            <div className='Login_Message1'>
                                {Msg}
                            </div>:null
                            }
                            <div className='Login_Form_Inside'>
                                <div className='Login_Form_Inside_Heading'>
                                    USER LOGIN
                                </div>
                                <div className='Login_Form_Inside_User'>
                                    <div className='Login_Form_Inside_User_Pic'>
                                        <img src='https://img.uxwing.com/wp-content/themes/uxwing/download/peoples-avatars-thoughts/user-icon.png' alt='pic' className='User_Pic_Com'/>
                                    </div>
                                    <input className='Login_Form_Inside_Use_Input1' placeholder='Email' onChange={(event)=>{setEmail(event.target.value)}}></input>
                                </div>
                                <div className='Login_Form_Inside_Password'>
                                    <div className='Login_Form_Inside_User_Pic'>
                                        <img src='https://www.freeiconspng.com/thumbs/lock-icon/lock-icon-21.png' alt='pic' className='User_Pic_Com'/>
                                    </div>
                                    <input className='Login_Form_Inside_Use_Input' placeholder='Password'onChange={(event)=>{setPassword(event.target.value)}}></input>
                                </div>
                                <div className='Forget'>Forget Password</div>
                                <div className='Login_Button_Outline'>
                                    <div className='Login_Button' onClick={Login}> LOG IN</div> 
                                </div>
                                <div className='Login_Line'>
                                    <div className='Login_Line_Base'>
                                        Donot Have a Account
                                    </div>
                                    <div className='Login' onClick={SignUp}>
                                        Sign Up
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