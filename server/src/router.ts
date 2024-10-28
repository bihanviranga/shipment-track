import express from 'express';

export const router = express.Router();

router.get('/', (req, res) => {
  console.log('/ PATH');
  res.json({ message: 'hello' });
});

router.get('/ping', (req, res) => {
  console.log('/ping PATH');
  res.json({ ping: 'pong' });
});
