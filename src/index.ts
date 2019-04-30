import WebSocket, { Server } from 'ws';
import { cityManager } from './city-manager';

const DEFAULT_PORT = 3000;
const FRONT_UPDATE_INTERVAL = 10000;

const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : DEFAULT_PORT;
const wss = new Server({ port });

wss.on('listening', () => {
  console.log(`Listening websocket on ${port}`);
});

wss.on('connection', async (socket: WebSocket) => {
  console.log('Client connected');
  broadcastUpdate();
  socket.on('close', () => console.log('Client disconnected'));
});

async function broadcastUpdate() {
  const cities = await cityManager.getAllCitiesWeather();
  wss.clients.forEach(async (socket: WebSocket) => {
    socket.send(JSON.stringify(cities));
  });
}

setInterval(broadcastUpdate, FRONT_UPDATE_INTERVAL);
