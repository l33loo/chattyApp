import React, { Component } from 'react';

export default class ChatBar extends Component {
  constructor({ props }) {
    super({ props });
    this.state = { text: "", username: "" };

    this.onTextContent = this.onTextContent.bind(this);
    this.onUsernameContent = this.onUsernameContent.bind(this);

    this.onEnterText = this.onEnterText.bind(this);
    this.onEnterUsername = this.onEnterUsername.bind(this);

  }

  onTextContent(event) {
    this.setState({
      text: event.target.value
    });
  }

  onUsernameContent(event) {
    this.setState({
      username: event.target.value
    });
  }

  onEnterText(event) {
    if(event.key === "Enter") {
      this.props.onNewPost(this.state.username, this.state.text);
      this.setState({ text: "" });
    }
  }

  onEnterUsername(event) {
    if(event.key === "Enter") {
      this.setState({ currentUser: this.state.username });
      this.props.onNewUsername(this.state.username);
    }

  }

  render() {
    const onSubmit = e => {
      e.preventDefault();
      this.setState({ text: '' });
    };

    return (
      <footer className="chatbar">
        <input className="chatbar-username" type="incomingMessage" defaultValue={ this.props.currentUser } onChange={this.onUsernameContent} placeholder="Your Name (Optional) and hit ENTER" onKeyPress={ this.onEnterUsername } />
        <input className="chatbar-message" type="postMessage" value={ this.state.text } onChange={this.onTextContent} placeholder="Type a message and hit ENTER" onKeyPress={ this.onEnterText } />
      </footer>);
  }
}