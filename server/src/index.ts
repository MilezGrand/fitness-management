import express from 'express';
import cors from 'cors';
import clientRouter from './routes/client.routes.js';
import serviceRouter from './routes/service.routes.js';
import { openConnection } from './db.js';


const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', clientRouter);
app.use('/api', serviceRouter);

openConnection()

app.listen(4000, () => {
  console.log('Server OK');
});

app.on('error', err => console.log(err))