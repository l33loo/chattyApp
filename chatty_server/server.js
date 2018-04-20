const express = require('express');
const WebSocket = require('ws');
const uuidv4 = require('uuid/v4');

const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  const numberConnectedMsg = { type: 'changeConnection', connected: wss.clients.size };
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(numberConnectedMsg));
  });
  ws.on('message', (data) => {
    wss.clients.forEach((client) => {
      // if (client.readyState === WebSocket.OPEN) {
        const msgObj = JSON.parse(data);
        if (msgObj.type === "postMessage") {
          const { username, content } = msgObj;
          const msgObjWithId = { type: 'incomingMessage', id: uuidv4(), username, content }
          client.send(JSON.stringify(msgObjWithId));
          console.log("incomingMessage: ", JSON.stringify(msgObjWithId));
        } else {
          const { username, content } = msgObj;
          const msgObjWithId = { type: 'incomingNotification', id: uuidv4(), username,  content }
          client.send(JSON.stringify(msgObjWithId));
          console.log("incomingNotification: ", JSON.stringify(msgObjWithId));

        }
      // }
    });
  });
  ws.on('close', () => {
    console.log("Client disconnected");
    wss.clients.forEach((client) => {
      client.send(JSON.stringify(numberConnectedMsg));
    });

  })
});
