/** @format */

import "./Settings.css";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "../../Context/Context";

const Settings = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState("");
  const { user, dispatch } = useContext(Context);
  const [state, setState] = useState(false);
  const [status, setStatus] = useState('');
  const [loader, setloader] = useState("");
  const [profile, setProfile] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("/" + user?.userD._id).then((res) => {
      setUsername(res.data.username);
      setEmail(res.data.email);
      setProfile(res.data.profilePic);
    });
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    var btn = document.querySelector('#loading-update')
    btn.className = "fa fa-circle-o-notch fa-spin";
    const newPost = {
      username,
      email,
      password,
    };
    const data = new FormData();
    try {
      if (file) {
        const options = {
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percent = Math.floor((loaded * 100) / total);
            setloader(percent);
            console.log(`${loaded}kb of ${total}kb | ${percent}%`);
          },
        };
        data.append("file", file);
        data.append("upload_preset", "movie-images");

        axios
          .post(
            "https://api.cloudinary.com/v1_1/dyaqiakqz/image/upload",
            data,
            options
          )
          .then((res) => {
            newPost.profilePic = res.data.secure_url;
            console.log(res.data);
            if (email !== null && password !== null && username !== null) {
              axios
                .put("/" + user?.userD._id, newPost)
                .then((res) => {
                  localStorage.clear();
                  dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
                  setState(true);
                  setStatus(res.data.message)
                  btn.classList.remove("fa", "fa-circle-o-notch", "fa-spin");
                })
                .catch((e) => {
                  btn.classList.remove("fa", "fa-circle-o-notch", "fa-spin");
                });
            } else {
              axios.put("/", +user.userD._id, newPost).then((res) => {
                localStorage.clear();
                 setStatus(res.data.message);
                 btn.classList.remove("  fa-spin");
                 dispatch({
                  type: "LOGIN_SUCCESS",
                  payload: res.data,
                });
              });
            }
          });
      } else {
        if (email !== null && password !== null && username !== null) {
          const res = await axios.put("/" + user.userD._id, newPost);
          localStorage.clear();
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
          setState(true);
          setStatus(res.data.message);
          btn.classList.remove("fa", "fa-circle-o-notch", "fa-spin");
        }
      }
    } catch (e) {
     setError(e.response.data)
     btn.classList.remove("fa", "fa-circle-o-notch", "fa-spin");
    console.log(btn);
    }
  };


  return (
    <div className="settingsWrapper">
      <div className="settings">
        <form onSubmit={handleUpdate}>
          {file ? (
            <div className="icon-user">
              <label htmlFor="fileInput">
                <img
                  className="settingsPPImg"
                  src={URL.createObjectURL(file)}
                  alt=""
                />
              </label>
            </div>
          ) : profile ? (
            <div className="icon-user">
              <label htmlFor="fileInput">
                <img className="settingsPPImg" src={profile} alt="" />
              </label>
            </div>
          ) : (
            <div className="icon-user" htmlFor="">
              <label htmlFor="fileInput">
                <i className=" fa fa-user"></i>
              </label>
            </div>
          )}
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />

          <input
            type="text"
            placeholder="Username..."
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required={true}
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required={true}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            title="must be iclude @gmail.com"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required={true}
          />
          <button className='m-auto'>
            Update 
            <i id="loading-update"></i>
          </button>
          <span>
            {status
              ? status
              : error?.keyValue?.username
              ? "username already exit"
              : null || error?.keyValue?.email
              ? "email already exit"
              : ""}{" "}
          </span>
        </form>
      </div>
    </div>
  );
};

export default Settings;
