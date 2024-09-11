import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const port = 3011;

app.use(cors());

app.get("/events", (req: Request, res: Response) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // function to send an event
  const sendEvent = (data: any) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  // send an event every 5 seconds
  const intervalId = setInterval(() => {
    const message = { time: new Date().toISOString(), text: "Hello from SSE!" };
    sendEvent(message);
  }, 5000);

  req.on("close", () => {
    clearInterval(intervalId);
  });
});

app.listen(port, () => {
  console.log(`SSE server is running on port ${port}`);
});
