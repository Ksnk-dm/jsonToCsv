import express from 'express';
import convertRouter from './routes/convert.route.js';

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.static('public'));

app.use('/convert', convertRouter);

export default app;