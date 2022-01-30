/** @format */

import "./TopBar.css";
import { Link } from "react-router-dom";
import { Context } from "../../Context/Context";
import { useContext } from "react";
import $ from "jquery";

const TopBar = () => {
  const { user, dispatch } = useContext(Context);

  const handleToggleBtn = (e) => {
    var a = document.getElementById("ul");
    var b = document.querySelector("#toggle-btn");

    $(".link").click((e) => {
      $(".link").removeClass("just-try");
      $(e.delegateTarget).addClass("just-try");
    });

    if (a.style.left === "-100%") {
      a.style.left = "0";
      b.style.color = "red";
    } else {
      a.style.left = "-100%";
      b.style.color = "";
    }
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="topbar">
      <nav>
        <Link to="/">
          <span id="daily-blog">Daily Blog</span>
        </Link>
        {user && <span id="username">{user.userD.username}</span>}
        <ul id="ul">
          <li onClick={handleToggleBtn}>
            <Link to="/" className="link  menu-link">
              Home
            </Link>
          </li>
          <li onClick={handleToggleBtn}>
            <Link to="/about" className="link menu-link">
              About
            </Link>
          </li>
          <li onClick={handleToggleBtn}>
            <Link to="/followers" className="link menu-link">
              Followers
            </Link>
          </li>
          <li onClick={handleToggleBtn}>
            <Link to="/following" className="link menu-link">
              Following
            </Link>
          </li>
          <li onClick={handleToggleBtn}>
            <Link to="/write" className="link menu-link">
              Write
            </Link>
          </li>
          {user ? (
            <li onClick={handleLogout}>
              <Link className="menu-link link">{user && "LOGOUT"}</Link>
            </li>
          ) : (
            <>
              <li onClick={handleToggleBtn}>
                <Link to="/login" className="link" id='login'>
                  Login
                </Link>
              </li>
              <li onClick={handleToggleBtn}>
                <Link to="/register" className="link" id='register'>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
        {user && <i className="topSearchIcon fas fa-search"></i>}
        <i
          onClick={handleToggleBtn}
          id="toggle-btn"
          className=" fas fa-toggle-on"></i>
      </nav>
      {user ? (
        <Link to="/settings">
          {user.userD.profilePic ? (
            <img className="topImg" src={user.userD.profilePic} alt="" />
          ) : (
            <img
              className="topImg"
              src="https://image.shutterstock.com/image-vector/user-icon-trendy-flat-style-260nw-418179856.jpg"
              alt=""
            />
          )}
        </Link>
      ) : null}
    </div>
  );
};

export default TopBar;
