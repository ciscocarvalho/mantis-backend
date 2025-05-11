import "dotenv/config";
import express from "express";
import cors from "cors";
import { FRONTEND_URL, PORT } from "./constants";
import { createServer } from "node:http";
import { Server } from "socket.io";
import registerEvents from "./events";
import routes from "./api/routes";

const app = express();
const server = createServer(app);
const io = new Server(server);

const corsMiddleware = cors({ origin: FRONTEND_URL, credentials: true });

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(corsMiddleware);

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.get("/", (req, res) => {
  res.status(200).send(
    `    <style>
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      }

      html, body {
        min-height: 100vh;
      }

      body {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    </style>
    <h1>It works!</h1>
`,
  );
});

app.use("/", routes);

io.engine.use(corsMiddleware);

registerEvents(io);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

export default server;
