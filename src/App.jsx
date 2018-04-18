import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
    constructor() {
        super();
        this.state = {
            currentUser: "bob",
            messages: [
                {
                    id: 1,
                    type: "incomingMessage",
                    content: "I won't be impressed with technology until I can download food.",
                    username: "Anonymous1"
                },
                {

                    id: 2,
                    type: "incomingNotification",
                    content: "Anonymous1 changed their name to nomnom",
                },
                {
                    id: 3,
                    type: "incomingMessage",
                    content: "I wouldn't want to download Kraft Dinner. I'd be scared of cheese packet loss.",
                    username: "Anonymous2"
                },
                {
                    id: 4,
                    type: "incomingMessage",
                    content: "...",
                    username: "nomnom"
                },
                {
                    id: 5,
                    type: "incomingMessage",
                    content: "I'd love to download a fried egg, but I'm afraid encryption would scramble it",
                    username: "Anonymous2"
                },
                {
                    id: 6,
                    type: "incomingMessage",
                    content: "This isn't funny. You're not funny",
                    username: "nomnom"
                },
                {
                    id: 7,
                    type: "incomingNotification",
                    content: "Anonymous2 changed their name to NotFunny",

                }
            ]

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
