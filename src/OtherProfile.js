import React, { useEffect, useState } from 'react';
import ChatBox from './ChatBox';
import { useHistory } from 'react-router-dom';



export default function Profile() {
  const [data, setData] = useState(null)
  const [check, setCheck] = useState(null)
  const [Search, setSearch] = useState(null)
  const [User, setUser] = useState(null)
  const [check1, setCheck1] = useState(null)
  const [friendname, setFriendname] = useState(null)
  const [friendCheck, setFriendCheck] = useState(false)
  const [Message, setMessage] = useState(false)
  const [Fri, setfri] = useState(null)
  const [friend, setFriendid] = useState(null)
  const [authCode, setAuthCode] = useState(null);
  const [start, setstart] = useState(false)
  const [Pending, setPending] = useState(false)

  const history=useHistory()


  var Use = JSON.parse(localStorage.getItem("User"));
  console.log(Use)


  useEffect(() => {
    const storedAuthCode = JSON.parse(localStorage.getItem("Auth-Code"));
    // localStorage.removeItem("User");

    if (!storedAuthCode) {
      console.log(authCode)
      history.push('/');
      window.location.reload();
    } else {
      setAuthCode(storedAuthCode.authtoken);
      setstart(true);
      console.log(storedAuthCode.authtoken,Use)
    }
  }, []);

  // var authCode = JSON.parse(localStorage.getItem("Auth-Code"));
  // if(!authCode)
  // {
  //   history.push('/')
  //   window.location.reload()
  // }
  // else{
  //   setstart(true)
  // }
  const pro = (a) => {
    setfri(a);
    console.log(a)
    setMessage(true)
    setstart(false)
    console.log(Fri);

  }

  // authCode = authCode.authtoken;
  // console.log(authCode);
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
    console.log(response);
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
        setFriendCheck(true)
        setFriendname(mergedArray)
        
        console.log(mergedArray,friendCheck)
  };
  useEffect(()=>{

  })
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
    if(authCode===null)
    {
      return
    }
    const fetch_user = await fetch("http://localhost:5000/api/User/GetUser", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authCode
      },
    });
    const response = await fetch_user.json();
    console.log(response);
    localStorage.setItem('Yourself', JSON.stringify(response));

    setData(response)
    setCheck(true)
  };
  useEffect(()=>{
    if (data===null)
    {
      return
    }
    if(data._id===Use._id)
    {
      history.push('/Profile');
      window.location.reload();
    }
  },[data])
  const get_make_friend = async () => {
    const bodys = {
      Friends: Use._id
    }
    console.log(bodys)
    const fetch_user = await fetch("http://localhost:5000/api/Friend/AddFriends", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authCode
      },
      body: JSON.stringify(bodys)
    });
    const response = await fetch_user.json();
    console.log(response)
    setfri(Use)
    setMessage(true)
    setstart(false)

  }
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
    console.log(authCode)
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
    localStorage.removeItem("User");
    var data = User[a]
    console.log(data)
    localStorage.setItem("User", JSON.stringify(data));
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
                <button className='MenuBar_Button' onClick={RealSlider}>
                  <img src='' className='MenuBar Pic' />
                </button>
                {/* Go Back To {data.name} */}
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
                      {Use.name}
                    </div>
                    <div className='Your_Email'>
                      {Use.email}
                    </div>
                    <div className='Your_Description'>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum sagittis neque, vel pulvinar velit convallis at. Nulla dictum dui sit amet ipsum convallis
                    </div>
                  </>
                  : null}
                <div className='Your_Name'>
                  <button className='New' onClick={get_make_friend}>Message</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div >
      <div className='Profile_Msg_Outline_Mobile'>
        <div className='Profile_Msg_Inside'>
          <div className='Profile_Msg_Head'>Messages
            <button className='MenuBar_Button1' onClick={RealSliderBack}>
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
      </>:null}
      {Message === true ?
        <ChatBox fri={Fri} /> : null
      }
    </>
  );
}