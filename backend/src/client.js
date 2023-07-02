import io from 'socket.io-client';

const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('WebSocket connection established');
});

socket.on('update', (message) => {
  console.log('Received message from server:', message);
});

socket.on('disconnect', () => {
  console.log('WebSocket connection closed');
});
