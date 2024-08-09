import WebSocket from "ws";

const ws = new WebSocket("http://localhost:3000");

ws.on("open", () => {
  console.log("Connection established");
  ws.send("Hello server !");
});

ws.on("message", (data) => {
  console.log(`Received :: ${data}`);
});

ws.on("close", () => {
  console.log("Connection closed");
});
