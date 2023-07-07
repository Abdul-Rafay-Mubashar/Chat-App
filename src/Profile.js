import React, { useEffect, useState } from 'react';
import ChatBox from './ChatBox';
import io, { Socket } from "socket.io-client"
import { useHistory } from 'react-router-dom';



const ENDPOINT = 'http://localhost:5000'
var socket, comparechatcompleted;



export default function Profile() {
  const [data, setData] = useState(null)
  const [check, setCheck] = useState(null)
  const [Search, setSearch] = useState(null)
  const [User, setUser] = useState(null)
  const [check1, setCheck1] = useState(null)
  const [friend, setFriendid] = useState(null)
  const [friendname, setFriendname] = useState(null)
  const [friendCheck, setFriendCheck] = useState(false)
  const [start, setstart] = useState(false)
  const [Message, setMessage] = useState(false)
  const [Pending, setPending] = useState(false)

  const [Fri, setfri] = useState(null)
  const history=useHistory()

  const transition_slider=()=>{
    document.getElementsByClassName('Profile_Msg_Outline_Mobile')[0].style.width='70vw'
  }
  const transition_slider_Back=()=>{
    document.getElementsByClassName('Profile_Msg_Outline_Mobile')[0].style.width='0vw'
  }
  const pro=(a)=>{    
    setfri(a);
    console.log(a)
    setMessage(true)
    console.log(Fri);
    setstart(false)
  }
  const [authCode, setAuthCode] = useState(null);
  useEffect(() => {
    const storedAuthCode = JSON.parse(localStorage.getItem("Auth-Code"));
    localStorage.removeItem("User");

    if (!storedAuthCode) {
      history.push('/');
      window.location.reload();
    } else {
      setAuthCode(storedAuthCode.authtoken);
      setstart(true);
    }
  }, []);

  // var authCode = JSON.parse(localStorage.getItem("Auth-Code"));
  // localStorage.removeItem("User");
  // if(!authCode)
  // {
  //   history.push('/')
  //   window.location.reload()
  // }
  // else{
  //   set
  //   setstart(true)
  // }

  // authCode = authCode.authtoken;
  // console.log(authCode);
  function filterDuplicates(arr) {
    const uniqueToValues = new Set();
    const filtered = [];
  
    for (let i = 0; i < arr.length; i++) {
      const obj = arr[i];
      const toValue = obj.to;
  
      if (!uniqueToValues.has(toValue)) {
        filtered.push(obj);
        uniqueToValues.add(toValue);
      }
    }
  
    return filtered;
  }
  const get_user_name = async () => {
    if (friend === null) {
      return
    }
    const fetch_user = await fetch("http://localhost:5000/api/User/GetUser/name", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(friend)
    });
    const response = await fetch_user.json();
    console.log(response,Pending);

    // if(Pending.length!==0)
    // {
    const mergedArray = Pending.map(pendingItem => {
      const matchingResponse = response.find(responseItem => responseItem._id === pendingItem._id);
      if (matchingResponse) {
        return { ...pendingItem, ...matchingResponse };
      } else {
        return pendingItem;
      }
    });
    var ok=[]
    var i=0,j=0;
    // while(i<mergedArray.length)
    // {
    //   j=0;
    //   var k=0;
    //   while(j<ok.length)
    //   {

    //   }
    // }
        // var ok=filterDuplicates(mergedArray)
        console.log(ok)
        setFriendname(mergedArray)
        console.log(mergedArray)
    // }
    // else{
        // setFriendname(response)
    // }
    // mergedArray.sort((a, b) => {
    //   const timeA = parseInt(a.time);
    //   const timeB = parseInt(b.time);
    //   return timeA - timeB;
    // });
    // mergedArray.sort((a, b) => b.no - a.no);
    // console.log(mergedArray);
    
    setFriendCheck(true)
  };
  const get_Friend = async () => {
    if (data === null) {
      return
    }
    const Friend={
      id:data._id
    }
    console.log(Friend)
    const fetch_user1 = await fetch("http://localhost:5000/api/Login/GetOfUser", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Friend)
    });
    const response1 = await fetch_user1.json();
    console.log(response1)
    const fetch_user = await fetch("http://localhost:5000/api/Friend/GetFriends", {
      method: "post",
      headers: {
        "auth-token": authCode
      }
    });
    const response = await fetch_user.json();
    console.log(response);
    const fetch_user2 = await fetch("http://localhost:5000/api/Message/GetCal", {
      method: "post",
      headers: {
        "auth-token": authCode,
        "Content-Type": "application/json",

      },
      body:JSON.stringify(response1)
    });
    const response2 = await fetch_user2.json();
    console.log(response2)
    setPending(response2)
    setFriendid(response)

  };
  useEffect(() => {
    
    get_Friend()

  }, [data])
  useEffect(() => {
    get_user_name()
  }, [friend])
  const get_user = async () => {
    if(authCode===null){
      return
    }
    const fetch_user = await fetch("http://localhost:5000/api/User/GetUser", {
      method: "post",
      headers: {
        "auth-token": authCode
      }
    });
    const response = await fetch_user.json();
    console.log(response);
    localStorage.setItem('Yourself', JSON.stringify(response));
    setData(response)
    setCheck(true)
  };
  useEffect(()=>{
    console.log(data)
  },[data])
  const get_user_search = async () => {
    if (Search === null || Search === "") {
      setCheck1(false)
      return
    }
    const go = {
      search: Search
    }
    const fetch_user = await fetch("http://localhost:5000/api/User/Search", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(go)
    });
    const response = await fetch_user.json();
    console.log(response);
    setUser(response)
    setCheck1(true)
  };
  useEffect(() => {
    get_user();
  }, [authCode]);

  useEffect(() => {
    get_user_search();
  }, [Search]);
  var i = 0;
  const Slider = () => {
    document.getElementsByClassName('Profile_Msg_Outline_Mobile')[0].style.display = "flex";
    document.getElementsByClassName('Profile_Msg_Outline_Mobile')[0].style.width = i + "vw";
    i++;


  }
  const SliderBack = () => {
    document.getElementsByClassName('Profile_Msg_Outline_Mobile')[0].style.width = i + "vw";
    i--;



  }
  const RealSlider = () => {

    var c = setInterval(() => {
      Slider()
      if (i > 70) {
        clearInterval(c)
        i = 70
      }
    })
  }
  const RealSliderBack = () => {

    var c = setInterval(() => {
      SliderBack()
      if (i === 0) {
        document.getElementsByClassName('Profile_Msg_Outline_Mobile')[0].style.display = "none";
        i = 0;
        clearInterval(c)
      }
    })
  }
  const storeData = (a) => {
    var data = User[a]
    console.log(data)
    localStorage.setItem("User", JSON.stringify(data));
    history.push('/OtherProfile');
    window.location.reload();
  }
  const LogOut=()=>{
    localStorage.clear()
    history.push('/')
    window.location.reload()
  }
  return (
    <>
    {start===true?
    <>
      <div className='Profile_Otline'>
        <div className='Profile_Msg_Outline'>
          <div className='Profile_Msg_Inside'>
            <div className='Profile_Msg_Head'>Messages</div>
            <div className='Profile_Msg_Peoples_Con'>
              {friendCheck === true ? friendname.map((res,index) => {
                console.log(friendname)
                if(res.no!==0)
                
                {console.log(res)
                return (

                  <>
                    <div className='Profile_Msg_Peoples' onClick={()=>{pro(res)}}>

                      <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMsIiUM3HC3dg7_Yok8d4ZOi1ca8h98q7mRw&usqp=CAU' className='Profile_Msg_Pic' />
                      <div className='Profile_Msg_Name'>
                        {res.name} 
                      </div>
                      <div className="Simple">{res.no !== 0 && res.no}</div>
                    </div>
                  </>
                )
                }
                else{
                  return(
                  <div className='Profile_Msg_Peoples1' onClick={()=>{pro(res)}}>

                  <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMsIiUM3HC3dg7_Yok8d4ZOi1ca8h98q7mRw&usqp=CAU' className='Profile_Msg_Pic' />
                  <div className='Profile_Msg_Name'>
                    {res.name} 
                  </div>
                  <div className="Simple">{res.no !== 0 && res.no}</div>
                </div>
                  )
                }
              }) : null
              }
            </div>
          </div>
        </div>
        <div className='Your_Profile_Container'>
          <div className='Your_Profile_Container_Inside'>
            {check === true ?
              <div className='Your_Profile_Name'>
                <button className='MenuBar_Button' onClick={transition_slider}>
                  <img src='' className='MenuBar Pic' />
                </button>
                Hello {data.name}
              </div>
              : null}
            <div className='Your_Profile_Search'>
              <input type='text' className='Search_User' placeholder='User Name' onChange={(event) => { setSearch(event.target.value) }} />
              {check1 === true ? (
                <div className="Search_User_Container">
                  {check1 === true
                    ? User.map((res, index) => (
                      <div className="User_Com" onClick={() => { storeData(index) }}>
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMsIiUM3HC3dg7_Yok8d4ZOi1ca8h98q7mRw&usqp=CAU"
                          className="Profile_Msg_Pic"
                        />
                        <div className="Profile_Msg_Name">{res.name}</div>
                      </div>
                    ))
                    : null}
                </div>
              ) : null}
            </div>
            <div className='Your_Com'>
              <div className='Your_Com_Con'>
                <div className='Your_Com_Con_Pic'>
                  <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMsIiUM3HC3dg7_Yok8d4ZOi1ca8h98q7mRw&usqp=CAU' className='Your_Pic' />
                </div>
                {check === true ?
                  <>
                    <div className='Your_Name'>
                      {data.name}
                    </div>
                    <div className='Your_Email'>
                      {data.email}
                    </div>
                    <div className='Your_Description'>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum sagittis neque, vel pulvinar velit convallis at. Nulla dictum dui sit amet ipsum convallis
                    </div>
                  </>
                  : null}
                <div className='Your_Name'>
                  <button className='New' onClick={LogOut}>Log Out</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
      <div className='Profile_Msg_Outline_Mobile'>
        <div className='Profile_Msg_Inside'>
          <div className='Profile_Msg_Head'>Messages
            <button className='MenuBar_Button1' onClick={transition_slider_Back}>
              <img src='' className='MenuBar Pic' />
            </button>
          </div>
          <div className='Profile_Msg_Peoples_Con'>
          {friendCheck === true ? friendname.map((res,index) => {
                console.log(friendname)
                if(res.no!==0)
                
                {console.log(res)
                return (

                  <>
                    <div className='Profile_Msg_Peoples' onClick={()=>{pro(res)}}>

                      <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMsIiUM3HC3dg7_Yok8d4ZOi1ca8h98q7mRw&usqp=CAU' className='Profile_Msg_Pic' />
                      <div className='Profile_Msg_Name'>
                        {res.name} 
                      </div>
                      <div className="Simple">{res.no !== 0 && res.no}</div>
                    </div>
                  </>
                )
                }
                else{
                  return(
                  <div className='Profile_Msg_Peoples1' onClick={()=>{pro(res)}}>

                  <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMsIiUM3HC3dg7_Yok8d4ZOi1ca8h98q7mRw&usqp=CAU' className='Profile_Msg_Pic' />
                  <div className='Profile_Msg_Name'>
                    {res.name} 
                  </div>
                  <div className="Simple">{res.no !== 0 && res.no}</div>
                </div>
                  )
                }
              }) : null
              }
          </div>
        </div>
      </div>
      </>
      :null}
      {Message===true? 
      <>
        <ChatBox fri={Fri}/>
        </>:null
      }
    </>
  );
}