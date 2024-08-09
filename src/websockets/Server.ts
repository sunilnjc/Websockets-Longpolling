import express from "express";
import { WebSocketServer } from "ws";
import axios from "axios";

const app = express();
const port = 3000;

const server = app.listen(port, () => {
  console.log(`Websocket server is running on port ${port}`);
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Client Connected !!");

  ws.send("Welcome to the websocket server !");

  ws.on("message", async (message) => {
    console.log(`You have received message from the client :: ${message}`);

    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos/1"
      );
      const data = response.data;
      ws.send(`Received data from API: ${JSON.stringify(data)}`);
    } catch (error) {
      console.log("Error occured :: ", error);
      ws.send(`Error occured :: ${error}`);
    }
  });

  ws.on("close", () => {
    console.log("Connection closed !!");
  });
});
