/** @format */

import "./SinglePost.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../Context/Context";
import { format } from "timeago.js";
import { useHistory } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const SinglePost = () => {
  const history = useHistory();
  const [post, setPost] = useState({});
  const [updateMode, setUpdateMode] = useState(false);
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [userd, setUserd] = useState([]);
  const [follow, setFollow] = useState("Follow");
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const postUserId = location.pathname.split("/")[3];

  useEffect(() => {
    getPost();
    getFollowingUser();
    window.scroll(0,0)
    
  }, [path]);


  
const interval = setInterval(() => {
  if (post !=='' && title !==''&& desc!=='') {
    clearInterval(interval);
    setLoading(false);
  }
}, 1000);

  // get following list

  const getFollowingUser = () => {
    if (user?.userD._id) {
      axios
        .get("/getFollowingUser?userid=" + user.userD._id)
        .then((res) => {
          setUserd(res.data);
          for (var i = 0; i < res.data.length; i++) {
            if (postUserId === res.data[i]) {
              setFollow("Following");
              break;
            } else {
              setFollow("Follow");
            }
          }
        })
        .catch((e) => {
          console.log("no following yet");
        });
    }
  };

  // get update post

  const getPost = async () => {
    const res = await axios.get("/posts/" + path);
    setPost(res.data);
    setTitle(res.data.title);
    setDesc(res.data.desc);
  };

  // delete post with use delete button

  const HandleDelete = async () => {
    const value = window.confirm(
      `are you sure delete this post ? ${post.title}`
    );

    try {
      if (value) {
        const res = await axios.delete("/posts/delete/" + path, {
          data: { username: user.userD.username },
        });
        window.location.replace("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // update post with use edit button

  const HandleUpdate = async () => {
    try {
      const res = await axios.put(`/posts/${post._id}`, {
        username: user.userD.username,
        title,
        desc,
      });
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  // follow user with use follow button

  const followUser = (e) => {
    if (user === null) {
      history.push("/login");
    }
    const userD = {
      userId: user?.userD._id,
      postUserId: post.userId,
    };

    if (e.target.innerHTML == "Follow") {
      e.target.innerHTML = "Following";
      console.log("follow");
      axios.put("/follow", userD).then((res) => {
        setFollow(res.data);
        console.log(res.data);
      });
    } else {
      console.log("unfollow", userD);
      e.target.innerHTML = "Follow";
      axios
        .delete(
          "/unFollow?userId=" + userD.userId + "&postUserId=" + postUserId
        )
        .then((res) => {
          setFollow(res.data);
          console.log(res.data);
        });
    }
  };

  return (
    <>
      {loading ? (
        <div id="loading-div-single-post">
          <div>
            <Spinner animation="border" variant="warning" />
          </div>
        </div>
      ) : (
        <div className="singlePost">
          <div className="singlePostWrapper">
            {post.image && (
              <img className="singlePostImg" src={post.image} alt="" />
            )}
            {updateMode ? (
              <input
                type="text"
                value={title}
                className="updateModeTitle"
                autoFocus={true}
                onChange={(e) => setTitle(e.target.value)}
              />
            ) : (
              <h1 className="singlePostTitle">{post.title}</h1>
            )}

            {user && post.username === user?.userD.username && (
              <div className="singlePostEdit">
                <i
                  className=" singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}></i>
                <i
                  className=" singlePostIcon far fa-trash-alt"
                  onClick={HandleDelete}></i>
              </div>
            )}

            <div className="singlePostInfo">
              <span className="singlePostAuthor">
                Author :
                {user && post.userId == user.userD._id ? (
                  <Link to={`/?username=${post.username}`} className="link">
                    <b className="postTitle">{post.username}</b>
                  </Link>
                ) : (
                  <Link to={`/profile/${post.userId}`} className="link">
                    <b className="postTitle">{post.username}</b>
                  </Link>
                )}
              </span>
              <span className="postDate">{format(post.createdAt)} </span>
              {post.username !== user?.userD.username && (
                <button onClick={followUser} id="follow-btn">
                  {follow}
                </button>
              )}
            </div>
            {updateMode ? (
              <textarea
                type="text"
                value={desc}
                className="updateModeDesc"
                onChange={(e) => setDesc(e.target.value)}
              />
            ) : (
              <div id='post-desc'>
                <p className="singlePostDes">{post.desc}</p>

              </div>
            )}
            {updateMode && (
              <button className="updateBtn" onClick={HandleUpdate}>
                Publish
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SinglePost;
