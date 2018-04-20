const express = require('express');
const WebSocket = require('ws');
const uuidv4 = require('uuid/v4');

const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new WebSocket.Server({ server });

// assigns colors cyclically
const assignColorToUsername = () => {
  if (wss.clients.size % 4 === 0) {
    return "#961092";
  }
  if (wss.clients.size % 3 === 0) {
    return "#101496";
  }
  if (wss.clients.size % 2 === 0) {
    return "#1f9610";
  }
  if (wss.clients.size % 1 === 0)  {
    return "#a51c29";
  }
};

wss.on('connection', (ws) => {
  console.log('Client connected');
  const numberConnectedMsg = { type: 'changeConnection', connected: wss.clients.size };

//make and use broadcast fxn
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(numberConnectedMsg));
  });
  ws.on('message', (data) => {

    //use broadcast fxn
    wss.clients.forEach((client) => {

      // see if I can put some of that on line 32.
      const msgObj = JSON.parse(data);
      if (msgObj.type === "postMessage") {
        const { username, content } = msgObj;
        const msgObjWithId = { type: 'incomingMessage', id: uuidv4(), username, content, color: assignColorToUsername() }
        client.send(JSON.stringify(msgObjWithId));
      } else {
        const { username, content } = msgObj;
        const msgObjWithId = { type: 'incomingNotification', id: uuidv4(), username,  content }
        client.send(JSON.stringify(msgObjWithId));
        }
    });
  });
  ws.on('close', () => {
    console.log("Client disconnected");

    //use broadcast fxn
    wss.clients.forEach((client) => {
      client.send(JSON.stringify(numberConnectedMsg));
    });
  })
});
