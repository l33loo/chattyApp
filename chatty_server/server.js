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
  ws.on('message', (data) => {
    wss.clients.forEach((client) => {
      // if (client.readyState === WebSocket.OPEN) {
        const msgObj = JSON.parse(data);
        const msgObjWithId = { id: uuidv4(), type: 'incomingMessage', ...msgObj }
        client.send(JSON.stringify(msgObjWithId));
        console.log("DATA: ", JSON.stringify(msgObjWithId));
      // }
    });
  });
  ws.on('close', () => console.log("Client disconnected"));
});
