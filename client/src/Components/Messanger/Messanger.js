/** @format */

import "./Messanger.css";
import ChatBar from "../ChatBar/ChatBar";
import Conversation from "../Conversation/Conversation";
import Message from "../Message/Message";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useContext, useRef } from "react";
import { Context } from "../../Context/Context";
import axios from "axios";
import { io } from "socket.io-client";

const Messanger = () => {
  const scroll = useRef();
  const { user } = useContext(Context);
  const [onlineUser, setOnlineUser] = useState([]);
  const [conversation, setconversation] = useState([]);
  const [currentChat, setcurrentChat] = useState(null);
  const [messages, setmessages] = useState([]);
  const [arrivalmessage, setarrivalmessage] = useState(null);
  const [newmessage, setnewmessage] = useState("");
  const [socket, setSocket] = useState(io(`http://${window.location.hostname}:2000`));
  
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  // first useEffect


  useEffect(() => {
    window.scroll(0, 0);
    if(path){
    addConverSation();
    }else{
       axios.get("/getConversation/" + user?.userD._id).then((res) => {
         setconversation(res.data);
       });
    }
    socket.emit("addUser", user?.userD._id);
    socket.on("getUsers", (users) => {
      setOnlineUser(users);
    });

    socket.on("getMessage", (data) => {
      console.log("server sedn message into client");
      setarrivalmessage({
        userId: data.userId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
    arrivalmessage &&
      currentChat.members===arrivalmessage.userId &&
      setmessages([...messages, arrivalmessage]);
  }, [user?._id, arrivalmessage, currentChat,socket]);

  // second useEffect

  useEffect(() => {
    axios
      .get("/getMessage/" + currentChat?._id)
      .then((res) => setmessages(res.data));
    // socket.on("getMessage", (message) => {
    // });
  }, [currentChat]);

  // addConversation
  const addConverSation = () => {
    let status = false;
    axios.get("/getConversation/" + user?.userD._id).then((res) => {
      setconversation(res.data);
      if (res.data.length !== 0) {
        
          for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].members_1 == path|| res.data[i].members_2 == path) {
              console.log('id equal');
              status = true;
              break;
            } else {
              status = false;
            }
          }
        
      }
      
      if (!status) {
        
        axios
          .post("/addConversation", {
            senderId: user.userD._id,
            receiverId: path && path,
          })
          .then((res) => {
            status=false;
             axios.get("/getConversation/" + user?.userD._id).then((res) => {
               setconversation(res.data);
             });
          })
          .catch(e=>console.log(e.response))
      }

    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const message = {
      conversationId: currentChat._id,
      senderId: user?.userD._id,
      text: newmessage,
    };
    if (newmessage.trim()) {
      axios.post("/addMessage", message).then((data) => {
        setnewmessage("");
        setmessages([...messages, data.data]);
      });
    }

    // let receiverId = currentChat.find(
    //   (friend) => friend !== user?.userD._id
    // );

    socket.emit("sendMessage", {
      userId: user?.userD._id,
      currentChat:currentChat.members_1,
      text: newmessage,
    });
  };
  useEffect(() => {
    scroll.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages, currentChat]);

  return (
    <div className="messanger">
      <div className="div-messanger-menu">
        {conversation &&
          conversation.map((value, key) => {
            if (
              value.members_1 !== user?.userD._id ||
              value.members_2 !== user?.userD._id
            ) {
              return (
                <div
                  key={key}
                  onClick={() => {
                    setcurrentChat(value);
                    if (window.screen.width < "800") {
                      var element = document.querySelector(
                        ".div-messanger-chatbox"
                      );
                      var element2 = document.querySelector(
                        ".div-messanger-menu"
                      );
                      element.style.display = "block";
                      element2.style.display = "none";
                    }
                  }}>
                  <Conversation
                    conversation={value}
                    currentUser={user?.userD._id}
                    onlineUser={onlineUser ? onlineUser : null}
                  />
                </div>
              );
            }
          })}
      </div>
      <div className="div-messanger-chatbox">
        <div
          id="top-bar-chat"
          onClick={() => {
            if (window.screen.width < "800") {
              var element = document.querySelector(".div-messanger-chatbox");
              var element2 = document.querySelector(".div-messanger-menu");
              element.style.display = "none";
              element2.style.display = "block";
            }
          }}>
          <ChatBar members={currentChat ? currentChat : null} />
        </div>

        {currentChat ? (
          <>
            {messages &&
              messages.map((messages, i) => {
                return (
                  <div key={i} ref={scroll} className="loop-chat">
                    <Message
                      own={messages.senderId === user?.userD._id}
                      messages={messages}
                    />
                  </div>
                );
              })}

            <div className="input-box">
              <input
                type="text"
                onKeyPress={(e) => (e.key === "Enter" ? handleSubmit(e) : null)}
                onChange={(e) => setnewmessage(e.target.value)}
                value={newmessage}
                placeholder="Type here..."
                id="input-chatbox"
              />
              <button onClick={(e) => handleSubmit(e)} id="btn-chatbox">
                Send
              </button>
            </div>
          </>
        ) : (
          <>
            <div id="open-conversation"></div>
          </>
        )}
      </div>
    </div>
  );
};

export default Messanger;
