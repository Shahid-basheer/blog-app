/** @format */

import "./Posts.css";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Context } from "../../Context/Context";
import axios from "axios";
import { format } from "timeago.js";
import { Spinner } from "react-bootstrap";
import $ from "jquery";

const Post = () => {
  const { user, dispatch } = useContext(Context);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    getPosts();
    getCurrentUser();
    getAllUsers();
  }, []);

  const interval = setInterval(() => {
    if (posts.length!==0) {
      setLoading(false);
      clearInterval(interval);
    }
  }, 1000);

  
  const getPosts = () => {
    axios.get("/posts").then((res) => {
      setPosts(res.data);
    });
  };


  const getAllUsers = () => {
    axios.get("/getAllUsers/22").then((res) => {
      setUsers(res.data);
    });
  };

  const getCurrentUser = () => {
    axios.get("/getUser/" + user?.userD._id).then((res) => {
      setCurrentUser(res.data);
      console.log(res.data)
    });
  };

  const follow = (e, postUserId) => {
    if (user === null) {
      history.push("/login");
    }
    const userD = {
      userId: user?.userD._id,
      postUserId: postUserId,
    };

    axios.put("/follow", userD).then((res) => {
      e.target.innerHTML = "Following";
    });
  };

  const unFollow = (e, postUserId) => {
    const userD = {
      userId: user?.userD._id,
      postUserId: postUserId,
    };

    axios
      .delete("/unFollow?userId=" + userD.userId + "&postUserId=" + postUserId)
      .then((res) => {
        console.log(res.data);
        e.target.innerHTML = "Follow";
      });
  };

  const checkFollowingDetails = (userD, postUserId) => {
    var status = false;
    for (var i = 0; i < userD?.following.length; i++) {
      if (userD?.following[i] === postUserId) {
        status = true;
        break;
      } else {
        status = false;
      }
    }

    return (
      <>
        <button
          onClick={(e) =>
            e.target.innerHTML === "Follow"
              ? follow(e, postUserId)
              : unFollow(e, postUserId)
          }
          id="btn-follow">
          {status ? "Following" : "Follow"}
        </button>
      </>
    );
  };

  const colorChange = () => {
    $(".menu-bar-color").click((e) => {
      $(".menu-bar-color").removeClass(" bg-warning");
      $(e.delegateTarget).addClass("bg-warning");
    });
  };

  const handlelogout = (e) => {
    dispatch({ type: "LOGOUT" });
  };


  return (
    <>
      {loading ? (
        <div className="loading-div">
          <div>
            <Spinner
              animation="grow"
              variant="warning"
              style={{ width: "50px", height: "50px" }}
            />
          </div>
        </div>
      ) : (
        <div className="posts-parent">
          <div className="menu-bar">
            <Link to="/following" className="link">
              <div>
                <i
                  className="fab fa-gratipay text-info menu-icon"
                  id="page-icon"></i>
                <span>Following</span>
              </div>
            </Link>

            <Link to="/followers" className="link">
              <div>
                <i
                  className="fas fa-user-friends text-danger"
                  id="event-icon"></i>
                <span>Followers</span>
              </div>
            </Link>

            <Link to="/write" className="link">
              <div>
                <i className="fas fa-cloud-upload-alt text-primary"></i>
                <span>Create Post</span>
              </div>
            </Link>

            <Link to="/about" className="link">
              <div>
                <i className="far fa-address-card text-light"></i>
                <span>About</span>
              </div>
            </Link>
           
              <div className="menu-bar-color" onClick={colorChange}>
                <i className="fas fa-comments text-warning"></i>
                <span>Chat</span>
              </div>
            

            <div className="menu-bar-color" onClick={colorChange}>
              <i className="fas fa-users text-danger"></i>
              <span>Groups</span>
            </div>
            <div className="menu-bar-color" onClick={colorChange}>
              <i className="fas fa-landmark text-info"></i>
              <span>Memories</span>
            </div>
            <div className="menu-bar-color" onClick={colorChange}>
              <i className="fas fa-comment-dots text-muted"></i>
              <span>Most recent</span>
            </div>
            {user && (
              <div
                className="menu-bar-color"
                onClick={() => {
                  colorChange();
                  handlelogout();
                }}>
                <i className="fas fa-sign-out-alt text-success"></i>
                <span>Logout</span>
              </div>
            )}
          </div>
          <div className="posts">
            {posts &&
              posts.map((data, index) => {
                return (
                  <div className="posts-post">
                    {data.image && (
                      <Link
                        to={`/posts/${data._id}/${data.userId}`}
                        className="link">
                        <img className="postImg" src={data.image} alt="image" />
                      </Link>
                    )}
                    <div className="postInfo bg-light">
                      <Link to={`/posts/${data._id}`} className="link">
                        <div id='postTitle'>
                        <span className="postTitle">{data.title}</span>

                        </div>
                      </Link>
                      <hr id="postTitle-hr" />
                      <span className="postDate">{format(data.createdAt)}</span>
                    </div>
                    <p className="postDes bg-light">{data.desc}</p>
                  </div>
                );
              })}
          </div>

          <div className="contact-post">
            <div id="suggestion-div">
              Follow Suggestion <br />
              <i className="fas fa-arrow-down"></i>
              <hr />
            </div>
            {users?.map((users, key) => {
              return (
                <tr>
                  {users._id !== user?.userD._id ? (
                    <div className="contact-loop-container">
                      {users?.profilePic ? (
                        <img src={users.profilePic} />
                      ) : (
                        <img
                          src={
                            "https://image.shutterstock.com/image-vector/user-icon-trendy-flat-style-260nw-418179856.jpg"
                          }
                          alt="image"
                        />
                      )}
                      <div>{users.username}</div>

                      {checkFollowingDetails(
                        currentUser[0] ? currentUser[0] : null,
                        users._id
                      )}
                    </div>
                  ) : null}
                </tr>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
