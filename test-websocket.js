const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:5000');

ws.on('open', () => {
  console.log('Connected to the server');
  ws.send(JSON.stringify({ event: 'sendMessage', data: { text: 'Hello, world!', sender: 'John' } }));
});

ws.on('message', (data) => {
  console.log('Message received:', data.toString());
});

ws.on('close', () => {
  console.log('Disconnected from the server');
});

ws.on('error', (err) => {
  console.log('WebSocket error:', err);
});
