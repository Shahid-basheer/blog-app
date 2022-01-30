import './Message.css'
import {format} from 'timeago.js'
const Message = ({own,messages}) => {
    return (
      <>
        <span className={own ? "message-span-left" : "message-span-right"}>
          {messages && messages.text}
        </span><br/>
        <span className={own ? "message-span-left-time" : "message-span-right-time"}>
          {messages && format(messages.createdAt)}
        </span>
      </>
    );
}

export default Message
