import React from 'react';

const Message = ({ message }) => {
  const username = message.username? message.username : "anonymous";
  const usernameColor = {color: message.color};
  const last3digitsText = message.content.slice(message.content.length - 3);
  console.log("LAST 3 DIGITS: ", typeof last3digitsText);
  if (last3digitsText === "jpg" || last3digitsText === "png" || last3digitsText === "gif") {
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
      </div>
      break;
    case "incomingNotification":
      return <div className="notification">
        <span className="notification-content">{ message.content }</span>
      </div>
      break;
  }
}
};

export default Message;
