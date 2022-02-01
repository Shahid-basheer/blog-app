/** @format */

import "./Followers.css";
import { Context } from "../../Context/Context";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import { Spinner } from "react-bootstrap";


const Followers = () => {
  const { user } = useContext(Context);
  const [state, setState] = useState([]);
  const [status, setStatus] = useState("");
  const [users, setUsers] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scroll(0, 0);
    getCurrentUser()
    axios
      .get("/getFollowers?userId=" + user?.userD._id)
      .then((res) => {
        setState(res.data);
      })
      .catch((e) => {
        setStatus(e?.response?.data);
      });
  }, []);


const interval = setInterval(() => {
  if (state) {
    setLoading(false);
    clearInterval(interval);
  } else {
    setLoading(true);
  }
}, 1000);
  const getCurrentUser = ()=>{
  axios.get('/getUser/'+user?.userD._id).then(res=>setUsers(res.data))
  }


  const removeFollower = (id, key) => {
    const classIndex = document.getElementsByClassName("following-map");
    classIndex[key].parentNode.removeChild(classIndex[key]);
    const data = {
      userId: user?.userD._id,
      followerId:id,
    };
    axios
      .delete(
        "/removeFollower?userId=" +
          data.userId +
          "&followerId=" +
          data.followerId
      )
      .then((res) => {
        alert("Successfully Deleted");
      });
  };

// follow our follower
  const follow = (userD, postUserId) => {
    var status = false
      for(var i=0;i<userD?.following?.length;i++){
        console.log(i);
          if(userD.following[i]!==postUserId){
            status=false
          }else{
            status=true
            break;
          }
      }

      if(!status){
        return (
          <>
            <button id="follow-btn-followers" onClick={(e)=>{
              const data={
                userId:userD._id,
                postUserId:postUserId
              }
              axios.put('follow',data).then(res=>e.target.remove())
            }}>Follow</button>
          </>
        );
      }
    
   
    };

//.....................................................................

  return (
    <>
    {loading?(
      <div className="loading-div">
        <div>
          <Spinner
            animation="grow"
            variant="warning"
            style={{ width: "100px", height: "100px" }}
          />
        </div>
      </div>
    ):(

     
      <div className="followers">
        {status && <span>{status}</span>}

        {state &&
          state.map((value, key) => {
            return (
              <div className="following-map">
                <div id="profile-div">
                  <div>
                    {value?.profilePic ? (
                      <Link to={`/profile/${value._id}`}>
                        <img id="followers-image" src={value.profilePic} />
                      </Link>
                    ) : (
                      <i className="fa fa-user"></i>
                    )}
                  </div>
                </div>
                <div id="username-div">
                  <Link to={`/profile/${value._id}`} className="link">
                    <span id="username-span">{value.username}</span>
                  </Link>
                  <button
                    id="remove-btn-followers"
                    onClick={(e) => {
                      removeFollower(value._id, key);
                    }}>
                    Remove
                  </button>
                  {follow(users && users[0], value._id)}
                </div>
              </div>
            );
          })}
      </div>
    )}
    </>
  );
};

export default Followers;
