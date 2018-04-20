import React from 'react';

const Message = ({ message }) => {
  const username = message.username ? message.username : "anonymous";
  const usernameColor = {color: message.color};

  //create isImage fxn
  const last3digitsText = message.content.slice(message.content.length - 3);
  if (last3digitsText === "jpg" || last3digitsText === "png" || last3digitsText === "gif") {

    //convert to fxn (to put at top)
    return <div className="message">
        <span style={ usernameColor } className="message-username">{ username }</span>
        <span className="message-content"><img src={ message.content }/></span>
      </div>;
  } else {
  switch(message.type) {

    //convert to fxn
    case "incomingMessage":
      return <div className="message">
        <span style={ usernameColor } className="message-username">{ username }</span>
        <span className="message-content">{ message.content }</span>
      </div>
      break;

    //convert to function
    case "incomingNotification":
      return <div className="notification">
        <span className="notification-content">{ message.content }</span>
      </div>
      break;
  }
}
};

export default Message;
