/** @format */

import "./Home.css";
import Header from "../../Components/Header/Header";
import Posts from "../../Components/Posts/Posts";
import axios from "axios";
import { Context } from "../../Context/Context";
import { useEffect, useContext, useState } from "react";

const Home = () => {
  const { user, dispatch } = useContext(Context);
  const [conversation, setConversation] = useState("");
  const [allUsers, setAllUsers] = useState("");
  let token;
  useEffect(() => {
    userAuthenticated();
    // addConverSation();
    token = localStorage.getItem("token");
  }, []);

  const userAuthenticated = () => {
    if (token) {
      axios
        .get("/isUserAuth?token=" + localStorage.getItem("token"))
        .then((res) => {
          console.log(res.data);
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data }).catch((e) => {
            console.log(e.response.data);
            dispatch({ type: "LOGIN_FAILURE" });
          });
        });
    }
  };
  return (
    <div>
      <Header />
      <Posts />
    </div>
  );
};

export default Home;
