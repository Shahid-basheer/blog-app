/** @format */

import "./Following.css";
import { Context } from "../../Context/Context";
import { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";

export const Following = () => {
  const { user } = useContext(Context);
  const [state, setState] = useState([]);
  const [status, setStatus] = useState("");
  const [follow, setFollow] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetFollowing();
    window.scroll(0, 0);
  }, []);
    console.log(state)

  const interval = setInterval(() => {
    if (state!=='') {
      setLoading(false);
      clearInterval(interval);
    } else {
      setLoading(true);
    }
  },500);

  

  const GetFollowing = () => {
    axios
      .get("/geFollowing?userid=" + user?.userD._id)
      .then((res) => {
        setState(res.data);
      })
      .catch((e) => {
        setStatus(e.response.data);
      });
  };

  const unFollow = (e, key) => {
    const classIndex = document.getElementsByClassName("following-map");
    classIndex[key].parentNode.removeChild(classIndex[key]);
    const data = {
      userId: user?.userD._id,
      postUserId: e.target.value,
    };
    axios
      .delete(
        "/unFollow?userId=" + data.userId + "&postUserId=" + data.postUserId
      )
      .then((res) => {
        setFollow(res.data);
        alert("Successfully Deleted");
      })
      .catch((e) => setFollow(e.response.data));
  };

  return (
    <>
      {loading && 
        <div className="loading-div">
          <div>
            <Spinner
              animation="grow"
              variant="warning"
              style={{ width: "100px", height: "100px" }}
            />
          </div>
        </div>
      }
        <div className="following">
          {status && <span>{status}</span>}
          {state &&
            state.map((value, key) => {
              return (
                <div className="following-map" key={key}>
                  <div id="profile-div">
                    <div>
                      {value.profilePic ? (
                        <Link to={`/profile/${value._id}`}>
                          <img
                            id="following-image"
                            src={value.profilePic}
                            alt=""
                          />
                        </Link>
                      ) : (
                        <Link to={`/profile/${value._id}`}>
                          <i className="fa fa-user"></i>
                        </Link>
                      )}
                    </div>
                  </div>
                  <div id="username-div">
                    <Link to={`/profile/${value._id}`} className="link">
                      <span id="username-span">{value.username}</span>
                    </Link>
                    <button
                      value={value._id}
                      id="unfollow-btn"
                      onClick={(e) => unFollow(e, key)}>
                      Unfollow
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      
    </>
  );
};

export default Following;
