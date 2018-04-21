import React, { Component } from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: "",
      messages: [],
      number: 0,
      color: ""
    }
    this.onNewPost = this.onNewPost.bind(this);
    this.onNewUsername = this.onNewUsername.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onopen = (event) => {
      console.log('Connected to server');
    };
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const msg = [data];
      const messages = this.state.messages.concat(msg);
      switch (data.type) {
        case "incomingMessage":
          this.setState({ messages: messages });
          break;
        case "incomingNotification":
          this.setState({ currentUser: data.username, messages: messages });
          break;
        case "changeConnection":
          this.setState({ number: data.connected });
          break;
        default:
          throw new Error("unknown event type " + data.type);
      }
    };
  }

  onNewPost(username, text) {
    const newMessage = {
      type: "postMessage",
      username: username,
      content: text
    };
    this.socket.send(JSON.stringify(newMessage));
  }

  onNewUsername(name) {
    const oldName = "anonymous" || this.state.currentUser;
    const content = oldName + " changed their name to " + name;
    const newUsername = {
      type: "postNotification",
      username: name,
      content: content
    };
    this.socket.send(JSON.stringify(newUsername));
  }

  render() {
    return (
      <div>
        <NavBar number={ this.state.number } />
        <MessageList messages={ this.state.messages } color={ this.state.color } currentUser={ this.state.currentUser } />
        <ChatBar currentUser={ this.state.currentUser } onNewPost={ this.onNewPost } onNewUsername={ this.onNewUsername} />
      </div>
    );
  }
}

export default App;
