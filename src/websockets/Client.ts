import WebSocket from "ws";

const ws = new WebSocket("http://localhost:3016");

ws.on("open", () => {
  console.log("Connection established");
  setInterval(() => {
    ws.send("Hello server !");
  }, 10000);
});

ws.on("message", (data) => {
  console.log(`Received :: ${data}`);
});

ws.on("close", () => {
  console.log("Connection closed");
});
