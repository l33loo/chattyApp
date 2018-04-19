import React, { Component } from 'react';

export default class ChatBar extends Component {
  constructor({ props }) {
    super({ props });
    this.state = { text: "", username: "" };

    this.onContent = this.onContent.bind(this);
    this.onEnterText = this.onEnterText.bind(this);
    this.onEnterUsername = this.onEnterUsername.bind(this);
  }

  // changeText = (event) => {
  //   this.setState({ text: event.target.value });
  // }

  onContent(event) {
    this.setState({
      text: event.target.value
    });
    // console.log("WOOHOO: ", this.state);
  }

  onEnterText(event) {
    const state = {};
    if(event.key === "Enter") {
      // console.log("STATE before: ", this.state);
      this.props.onNewPost(this.state.text);
      state.text = "";
      // console.log("STATE AFTER: ", this.state);
    }
    this.setState(state);
  }

  onEnterUsername(event) {
    const state = {};
    if(event.key === "Enter") {
      // console.log("STATE before: ", this.state);
      this.props.onNewPost(this.state.text);
      state.text = "";
      // console.log("STATE AFTER: ", this.state);
    }
    this.setState(state);
  }

  render() {
    console.log("Rendering <ChatBar/>");

    const onSubmit = e => {
      e.preventDefault();
      // this.props.sendMessage(this.state.text);
      this.setState({ text: '' });
    };

    const checkUser = this.props.currentUser ? this.props.currentUser : this.state.username
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={ checkUser } placeholder="Your Name (Optional) and hit ENTER" onKeyPress={ this.onEnterUsername } />
        <input className="chatbar-message" value={ this.state.text } onChange={this.onContent} placeholder="Type a message and hit ENTER" onKeyPress={ this.onEnterText } />
      </footer>);
  }
}