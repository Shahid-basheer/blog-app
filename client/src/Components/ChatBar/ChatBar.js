import './ChatBar.css'
import {useEffect,useState,useContext} from 'react'
import axios from 'axios'
import {Context} from '../../Context/Context'
const ChatBar = ({members}) => {
const [users, setusers] = useState('');
const {user} =  useContext(Context);
let friendId;
const image = "https://image.shutterstock.com/image-vector/user-icon-trendy-flat-style-260nw-418179856.jpg";

useEffect(() => {
 getUsers(members)


}, [members]);


// getUsers function
const getUsers =(id)=>{
    let i;
    if (id?.members_1 == user?.userD._id) {
      i = id?.members_2;
    } else {
      i = id?.members_1;
    }
  axios.get("/getUser/" + i).then((res) => setusers(res.data));

}

    return (
        <div className='chatBar'>
        {users[0]?
        (
            <>{users[0].profilePic?<img src={users[0].profilePic} className='chat-profile'/>:
            <img src={image} className='chat-profile'/>}</>
        ):(
            
            null
        )
        }
        <span id='chat-username'>{users[0]?.username}</span>
        </div>
    )
}

export default ChatBar
