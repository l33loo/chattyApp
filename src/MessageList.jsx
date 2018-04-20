import React from 'react';

import Message from './Message.jsx';

function MessageList ({ messages }) {
  const messageComponents = messages.map((msg) => (<Message key={ msg.id } message={ msg }/>));
  return (
    <main className="messages">
      { messageComponents }
    </main>
  );
}

export default MessageList;