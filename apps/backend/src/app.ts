import http from 'http';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import helmet from 'helmet';

import env from './config/env';
import { errorHandler } from './infrastructure/middleware/errorHandler';
import { refreshTokenMiddleware } from './infrastructure/middleware/refreshToken';
import { requestLogger } from './infrastructure/middleware/requestLogger';
import router from './routes';

dotenv.config();

const { PORT } = env;

const app = express();
const server = http.createServer(app);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    // TODO put front url here
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);
app.use(helmet());

app.use(requestLogger);
app.use(refreshTokenMiddleware);

app.use(router);

app.get('/', function (req: Request, res: Response) {
  res.send('Hello from backend');
});

// app.use((err: Error, req: Request, res: Response) => {
//   console.error(err.stack);
//   res.status(500).json({ error: err.message || 'Une erreur est survenue' });
// });

app.use(errorHandler);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
