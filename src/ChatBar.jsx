import React, {Component} from 'react';

export default class ChatBar extends Component {
  state = {text: ''}
  changeText = ({target: {value}}) => {
    this.setState({text: value});
  }

  render() {
    const onSubmit = e => {
      e.preventDefault();
      this.props.sendMessage(this.state.text);
      this.setState({text: ''});
    };
    return (
      <footer class="chatbar">
        <input class="chatbar-username" placeholder="Your Name (Optional)" />
        <input class="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>);
  }
}