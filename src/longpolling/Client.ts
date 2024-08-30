import axios from "axios";

const poll = async () => {
  try {
    console.log("Attempting to poll the server...");
    const response = await axios.get("http://localhost:3010/poll");
    console.log(`Received data from API: ${JSON.stringify(response.data)}`);

    // immediately poll again once the response is received
    poll();
  } catch (error: any) {
    console.log("Error occured :: ", error.message);

    // retry after 5 seconds
    setTimeout(poll, 5000);
  }
};

// start polling
poll();
