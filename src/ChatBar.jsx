import React, { Component } from 'react';

export default class ChatBar extends Component {
  constructor({ currentUser }) {
    super({ currentUser });
    this.state = { text: "" };
  }

  changeText = ({ target: { value } }) => {
    this.setState({ text: value });
  }

  render() {
    console.log("Rendering <ChatBar/>");

    const onSubmit = e => {
      e.preventDefault();
      // this.props.sendMessage(this.state.text);
      this.setState({ text: '' });
    };
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={this.props.currentUser} placeholder="Your Name (Optional)"  />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>);
  }
}