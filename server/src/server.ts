import cors from 'cors';
import express from 'express';
import 'dotenv/config';
import routerV1 from '@/routes/v1';
import { errorHandler } from './middleware/errorHandler';

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1', routerV1);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
