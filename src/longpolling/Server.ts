import axios from "axios";
import express, { Request, Response } from "express";

const app = express();
const port = 3010;

const clients: Response[] = [];

const API_URL = "https://public-api.solscan.io/chaininfo/";
const API_TOKEN =
  "eyJhbGciOiJI************XVCJ9.eyJj*******************************Y29tIiwiYWN0aW9uIjoidG9rZW4tYXBpIiwiYXBpVmVyc2lvbiI6I*********************_5mEzaL-C9bv8sDd_3n0UKx5KXOaAMxtePvw";

app.get("/poll", async (req: Request, res: Response) => {
  //  store the response object in the clients array and holds the request until the server sends a response
  console.log("Received request on /poll endpoint");
  clients.push(res);

  setTimeout(fetchAndSendData, 10000);
});

app.listen(port, () => {
  console.log(`Long polling server is running on port ${port}`);
});

const fetchAndSendData = async () => {
  try {
    // Fetch data from an alternative external API
    const response = await axios.get(API_URL, {
      headers: {
        "Content-Type": "application/json",
        token: API_TOKEN,
      },
    });

    const apiData = response.data;

    // Send the fetched data to all waiting clients
    clients.forEach((client) => client.json(apiData)); // Equivalent to res.json(apiData)

    // Clear the client list after responding
    clients.length = 0;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      console.error("Error details:", error.response?.data);
    } else {
      console.error("Unexpected error:", error);
    }
    clients.forEach((client) => {
      if (!client.headersSent) {
        client.status(500).json(error);
      }
    });
    clients.length = 0;
  }
};
