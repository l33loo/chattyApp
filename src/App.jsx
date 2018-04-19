import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
    constructor() {
        super();
        this.state = {
            currentUser: "",
            messages: []

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
        console.log('Connected to server');
        this.socket.addEventListener('message', (event) => {
            const messageObject = JSON.parse(event.data);
            // this.setState({
            //     messages: this.state.messages.concat(newMessage)
            // });
        });
        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
                console.log("DAAAAATA TYYYPE: ", data.type);

            if (data.type === "incomingMessage") {
                console.log("GOT TO MESSAGE@");
                const msg = [data];
                const messages = this.state.messages.concat(msg);
                this.setState({ messages: messages });
            } else {
                console.log("GOT TO USER@");
                const msg = [data];
                // console.log(msg);
                const messages = this.state.messages.concat(msg);
                console.log("NEW NAME!: ", data.content.slice(5));
                this.setState({ currentUser: data.content[5], messages: messages });

            }
        }
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
            content: content,
            type: "postNotification"
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
                </nav>
                <MessageList messages={ this.state.messages } />
                <ChatBar currentUser={ this.state.currentUser } onNewPost={ this.onNewPost } onNewUsername={ this.onNewUsername} />
            </div>);
    }
}
export default App;
