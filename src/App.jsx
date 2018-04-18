import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
    constructor() {
        super();
        this.state = {
            currentUser: "bob",
            messages: []

        }
        this.onNewPost = this.onNewPost.bind(this);
    }

    componentDidMount() {
        console.log("componentDidMount <App />");
        // setTimeout(() => {
        //     console.log("Simulating incoming message");
        //     const newMessage = {id: 8, username: "Michelle", content: "Hello there!"}
        //     const messages = this.state.messages.concat(newMessage);
        //     this.setState({ messages: messages })
        // }, 3000);
        this.socket = new WebSocket('ws://localhost:3001');
        console.log('Connected to server');
        this.socket.addEventListener('message', (event) => {
            const messageObject = JSON.parse(event.data);
            // this.setState({
            //     messages: this.state.messages.concat(newMessage)
            // });
        });
    }

    onNewPost(text) {
        const newMessage = {
            //need to change how id is created
            id: (Math.floor(Math.random() * 2000) + 7),
            type: 'incomingMessage',
            content: text,
            username: this.state.currentUser
        };
        // const messages = this.state.messages.concat(newMessage);
        // this.setState({ messages: messages });
        // console.log(this.state);
        // this.socket.onopen = (event) => {
            this.socket.send(JSON.stringify(newMessage));
        // }

        // Blank the text input element, ready to receive the next line of text from the user.
        // document.getElementById("text").value = "";
    }

    render() {
        console.log("Rendering <App/>");
        return (
            <div>
                <nav className="navbar">
                  <a className="navbar-brand" href="/">Chatty</a>
                </nav>
                <MessageList messages={ this.state.messages } />
                <ChatBar currentUser={ this.state.currentUser } onNewPost={ this.onNewPost } />
            </div>);
    }
}
export default App;
