import Message from './Message.jsx';

export default function MessageList ({messages}) {
  const messageComponents = messages.map((msg) => (<Message message={msg}/>))
    return (
      <main class="messages">
          {messageComponents}
      </main>
    );
}

//const X = (props) => (
//<div>...</div>)
// implicit return

// deconstructing`