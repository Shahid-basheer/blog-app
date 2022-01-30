import './Conversation.css'
import { useState,useEffect,useContext } from 'react'
import axios from 'axios'
import { Context } from "../../Context/Context";

const Conversation = ({conversation,currentUser,onlineUser}) => {
const {user} = useContext(Context)
const [users, setusers] = useState([])



useEffect(() => {
     getUser()
    // getOnlineUsers()
},[])
const getUser = ()=>{
  let id;
   if (conversation.members_1 == user?.userD._id){
     id = conversation.members_2;
   }else{
     id = conversation.members_1;
   }
     axios
       .get("/getUser/" + id)
       .then((res) => setusers(res.data));
   
}


const getOnlineUsers = (id)=>{

    return (
      <div> 
  {onlineUser?.map((user,key)=><p key={key} id='online-user'>{user.userId===id?'Online':null}</p>)}  
      </div>
    )
}

    return (
        <div className='conversation'>
        
        {
            users&&users.map((value,i)=>{
                return (
                  <div key={i}>
                    {value.profilePic ? (
                      <img src={value.profilePic} alt="" />
                    ) : (
                      <img
                        src="https://image.shutterstock.com/image-vector/user-icon-trendy-flat-style-260nw-418179856.jpg"
                        alt=""
                      />
                    )}

                    <span>{value.username}</span>
                    
                    {getOnlineUsers(value._id)}
                  </div>
                );
                })
           }

            </div>
    )
}

export default Conversation
