const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.get('/health', (_req, res) => res.json({ ok: true, players: io.engine.clientsCount }));

// Shared player coordinates use the 2D tile-map coordinate space (72 x 56).
const players = new Map();
io.on('connection', socket => {
  socket.on('join', data => {
    const p = {
      id: socket.id,
      name: String(data.name || '新生玩家').slice(0, 12),
      job: String(data.job || ''),
      jobKey: ['sword', 'fighter', 'archer', 'psy'].includes(data.jobKey) ? data.jobKey : 'sword',
      genderKey: ['male', 'female'].includes(data.genderKey) ? data.genderKey : 'male',
      color: Number(data.color) || 0x4d8fc7,
      x: Math.max(0, Math.min(72, Number(data.x) || 0)),
      z: Math.max(0, Math.min(56, Number(data.z) || 0)),
      rot: 0
    };
    players.set(socket.id, p);
    io.emit('players', [...players.values()]);
  });
  socket.on('move', data => {
    const p = players.get(socket.id);
    if (!p) return;
    p.x = Math.max(0, Math.min(72, Number(data.x) || 0));
    p.z = Math.max(0, Math.min(56, Number(data.z) || 0));
    p.rot = Number(data.rot) || 0;
    socket.broadcast.emit('players', [...players.values()]);
  });
  socket.on('combat', data => {
    socket.broadcast.emit('combat-event', { player: players.get(socket.id)?.name, type: data.type });
  });
  socket.on('disconnect', () => {
    players.delete(socket.id);
    io.emit('players', [...players.values()]);
  });
});

server.listen(PORT, '0.0.0.0', () => console.log(`Campus Legend Online 2D running at http://localhost:${PORT}`));
