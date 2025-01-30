const express = require("express");
const axios = require("axios");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "client", "dist")));

// Set up Axios to enable communication with the DataRobot
axios.defaults.baseURL = process.env.DATAROBOT_ENDPOINT;
axios.defaults.headers.common = {
  Authorization: `Bearer ${process.env.DATAROBOT_API_TOKEN}`,
};

// Set us some of the App variables
const PORT = process.env.PORT || 8080;

// Handle routes and serve the React app
app.get(["/", "/projects"], (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Example of API
app.get("/api/projects", async (req, res) => {
  try {
    const response = await axios.get("/projects/");
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
