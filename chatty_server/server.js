const express = require('express');
const WebSocket = require('ws');
const uuidv4 = require('uuid/v4');

const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new WebSocket.Server({ server });

// assigns colors cyclically
const assignColorToUsername = (nrClients) => {
  if (nrClients % 4 === 0) {
    return "#961092";
  }
  if (nrClients % 3 === 0) {
    return "#101496";
  }
  if (nrClients % 2 === 0) {
    return "#1f9610";
  }
  if (nrClients % 1 === 0)  {
    return "#a51c29";
  }
};

wss.on('connection', (ws) => {
  console.log('Client connected');
  const numberConnectedMsg = { type: 'changeConnection', connected: wss.clients.size };
  const nrClients = wss.clients.size;

  wss.clients.forEach((client) => {
    client.send(JSON.stringify(numberConnectedMsg));
  });

  ws.on('message', (data) => {
    wss.clients.forEach((client) => {
      const msgObj = JSON.parse(data);
      const { username, content } = msgObj;
      const msgObjWithId = { id: uuidv4(), username, content };
      if (msgObj.type === "postMessage") {
        client.send(JSON.stringify({ type: 'incomingMessage', ...msgObjWithId, color: assignColorToUsername(nrClients) }));
      } else {
        client.send(JSON.stringify({ type: 'incomingNotification', ...msgObjWithId }));
        }
    });
  });

  ws.on('close', () => {
    console.log("Client disconnected");

    wss.clients.forEach((client) => {
      client.send(JSON.stringify(numberConnectedMsg));
    });
  })
});
