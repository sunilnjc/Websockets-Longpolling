import express from "express";
import { WebSocketServer } from "ws";
import axios from "axios";

const app = express();
const port = 3016;

const API_URL = "https://public-api.solscan.io/chaininfo/";
const API_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.*****-C9bv8sDd_3n0UKx5KXOaAMxtePvw";

const server = app.listen(port, () => {
  console.log(`Websocket server is running on port ${port}`);
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Client Connected !!");

  ws.send("Welcome to the websocket server !");

  // ws.on("message", async (message) => {
  // console.log(`You have received message from the client :: ${message}`);
  setInterval(fetchDatafromServer, 5000);
  // });

  ws.on("close", () => {
    console.log("Connection closed !!");
  });
});

const fetchDatafromServer = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        "Content-Type": "application/json",
        token: API_TOKEN,
      },
    });
    const apiData = response.data;
    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(JSON.stringify(apiData));
      }
    });
  } catch (error) {
    console.error("Error occured :: ", error);
  }
};
