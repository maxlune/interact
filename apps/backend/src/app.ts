import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import http from "http";
import helmet from 'helmet'
import cookieParser from "cookie-parser";

import cors from 'cors';

import env from "./config/env";
import {db} from "./data";
import {users} from "./data/schema";

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

// TESTS
app.post("/test-create-user", async (req: Request, res: Response) => {
  try {
    const newUser = await db.insert(users).values(req.body).returning();
    res.json(newUser[0]);
  } catch (error: any) {
    res.json({ error: error.message });
  }
});

app.get("/test-get-users", async (req: Request, res: Response) => {
  try {
    const allUsers = await db.select().from(users);
    res.json(allUsers);
  } catch (error: any) {
    res.json({ error: error.message });
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})