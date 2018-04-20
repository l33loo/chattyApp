import React from 'react';

const Message = ({ message }) => {
  console.log("COLOR: ", message.color)
  const usernameColor = {color: message.color};
  switch(message.type) {
    case "incomingMessage":
    const username = message.username? message.username : "anonymous";
      return <div className="message">
        <span style={ usernameColor } className="message-username">{ username }</span>
        <span className="message-content">{ message.content }</span>
      </div>
      break;
    case "incomingNotification":
      return <div className="notification">
        <span className="notification-content">{ message.content }</span>
      </div>
      break;
  }
};

export default Message;
