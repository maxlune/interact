import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import http from "http";
import helmet from 'helmet'
import cookieParser from "cookie-parser";

import cors from 'cors';

import env from "./config/env";

const { PORT } = env;

const app = express();
const server = http.createServer(app);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.get("/", function (req: Request, res: Response) {
  res.send("Hello from backend");
})

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})