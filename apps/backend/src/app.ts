import dotenv from "dotenv";
dotenv.config();

import express, {NextFunction, Request, Response} from "express";
import http from "http";
import helmet from 'helmet'
import cookieParser from "cookie-parser";
import cors from 'cors';

import env from "./config/env";
import router from "./routes";

const { PORT } = env;

const app = express();
const server = http.createServer(app);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.use(router);

app.get("/", function (req: Request, res: Response) {
  res.send("Hello from backend");
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || "Une erreur est survenue" });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})