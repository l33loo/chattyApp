import React, { Component } from 'react';
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
        console.log("componentDidMount <App />");
        // setTimeout(() => {
        //     console.log("Simulating incoming message");
        //     const newMessage = {id: 8, username: "Michelle", content: "Hello there!"}
        //     const messages = this.state.messages.concat(newMessage);
        //     this.setState({ messages: messages })
        // }, 3000);
        this.socket = new WebSocket('ws://localhost:3001');

        this.socket.onopen = (event) => {
            console.log('Connected to server');
        };

        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("DUDUDUDUDATA!: ", data);
            const msg = [data];
            const messages = this.state.messages.concat(msg);
            switch (data.type) {
                case "incomingMessage":
                    console.log("GOT TO MESSAGE@");
                    // const msg = [data];
                    // const messages = this.state.messages.concat(msg);
                    this.setState({ messages: messages });
                    break;
                case "incomingNotification":
                    console.log("GOT TO USER@");
                    // const msg = [data];
                    // console.log(msg);
                    // const messages = this.state.messages.concat(msg);
                    console.log("NEW NAME!: ", data.content.slice(5));
                    this.setState({ currentUser: data.username, messages: messages });
                    break;
                case "changeConnection":
                    console.log("NEW CONENCTION", data.connected);
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
        // const messages = this.state.messages.concat(newMessage);
        // this.setState({ messages: messages });
        // console.log(this.state);
        // this.socket.onopen = (event) => {
            this.socket.send(JSON.stringify(newMessage));
        // }

        // Blank the text input element, ready to receive the next line of text from the user.
        // document.getElementById("text").value = "";
    }

    onNewUsername(name) {
        const oldName = "anonymous" || this.state.currentUser;
        const content = oldName + " changed their name to " + name;

        const newUsername = {
            type: "postNotification",
            username: name,
            content: content
        };
        // const messages = this.state.messages.concat(newMessage);
        // this.setState({ messages: messages });
        // console.log(this.state);
        // this.socket.onopen = (event) => {
            this.socket.send(JSON.stringify(newUsername));
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
                  <div className="number-connected">{ this.state.number } user(s) connected</div>
                </nav>
                <MessageList messages={ this.state.messages } color={ this.state.color } currentUser={ this.state.currentUser } />
                <ChatBar currentUser={ this.state.currentUser } onNewPost={ this.onNewPost } onNewUsername={ this.onNewUsername} />
            </div>);
    }
}
export default App;
