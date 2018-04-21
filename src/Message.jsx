import React from 'react';

const isImage = (message) => {
  const last3digitsText = message.slice(message.length - 3);
  return last3digitsText === "jpg" || last3digitsText === "png" || last3digitsText === "gif"
};

const Message = ({ message }) => {
  const username = message.username ? message.username : "anonymous";
  const usernameColor = {color: message.color};

  if (isImage(message.content)) {
    return <div className="message">
      <span style={ usernameColor } className="message-username">{ username }</span>
      <span className="message-content"><img src={ message.content }/></span>
    </div>;
  } else {
    switch(message.type) {
      case "incomingMessage":
        return <div className="message">
          <span style={ usernameColor } className="message-username">{ username }</span>
          <span className="message-content">{ message.content }</span>
        </div>;
        break;
      case "incomingNotification":
        return <div className="notification">
          <span className="notification-content">{ message.content }</span>
        </div>;
        break;
    }
  }
};

export default Message;
