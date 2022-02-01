/** @format */

import "./Profile.css";
import { Link, useLocation,useHistory } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Context } from "../../Context/Context";

const Profile = () => {
  const { user } = useContext(Context);
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const histroy = useHistory()
  const [state, setstate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getCount();
  }, []);

  // Count of followers and following
  const getCount = () => {
    if (path) {
      axios
        .get("/" + path)
        .then((res) => {
          console.log(res.data);
          setstate(res.data);
        })
        .catch((e) => {
          setError(e.response.data);
        });
    }
  };

  return (
    <div className="profile-wrapper">
      {error && error}
      <div className="profile-div">
        <div id="cover-photo-div">
          <img src="https://images.edexlive.com/uploads/user/imagelibrary/2020/2/27/original/nature_and_child.jpg?w=400&dpr=2.6" />
        </div>
        <div id="profile-icon-parent">
          <div className="profile-icon">
            <div id="icon-div">
              {state.profilePic ? (
                <img src={state.profilePic} alt="" />
              ) : (
                <i id="profile-icon" className="fa fa-user"></i>
              )}
            </div>
          </div>
        </div>
        <div id='uname-div'>
        <div>{state.username}</div>
        </div>
        <div className="details">
          <div>
            <span id="following">Following</span>
            <p id="following-length">{state ? state.following.length : null}</p>
          </div>

         
          <div>
            <span id="followers">Followers</span>
            <p id="followers-length">{state ? state.followers.length : null}</p>
          </div>

          <br />
        </div>
      </div>
    </div>
  );
};

export default Profile;
