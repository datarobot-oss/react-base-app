const express = require("express");
const axios = require("axios");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
// The client is built with a relative Vite base (see client/vite.config.js),
// so every asset reference in index.html resolves against the page's own
// URL - no path-prefix rewriting needed even behind a proxy that serves this
// app on a sub-path such as /custom_applications/{id}/.
app.use(express.static(path.join(__dirname, "client", "dist")));

// Set up Axios to enable communication with the DataRobot
axios.defaults.baseURL = process.env.DATAROBOT_ENDPOINT;
axios.defaults.headers.common = {
  Authorization: `Bearer ${process.env.DATAROBOT_API_TOKEN}`,
};

// Set us some of the App variables
const PORT = process.env.PORT || 8080;

// DataRobot list endpoints (e.g. deployments, use cases) return either a raw
// array or a paginated {data: [...]} envelope depending on the endpoint.
function unwrapList(data) {
  return Array.isArray(data) ? data : (data?.data ?? []);
}

// The DataRobot web app's host, derived from the API endpoint
// (e.g. "https://app.datarobot.com/api/v2/" -> "https://app.datarobot.com"),
// for linking out to a resource's page in the DataRobot UI.
function getAppHost() {
  return (process.env.DATAROBOT_ENDPOINT || "").replace(/\/api\/v2\/?$/, "");
}

// Forward a DataRobot API error to the client, without JSON-serializing
// error.request - it's a raw Node request object with circular references
// (e.g. its agent's socket pool).
function sendDataRobotError(res, error) {
  if (error.response) {
    return res.status(error.response.status).json({
      status: error.response.status,
      data: error.response.data,
      message: error.message,
    });
  } else if (error.request) {
    return res.status(500).json({
      message: "No response from API",
      error: error.code || error.message,
    });
  } else {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

// Proxy a GET request to the DataRobot API, forwarding its error status when available.
function proxyToDataRobot(apiPath, transform = (data) => data) {
  return async (req, res) => {
    try {
      const response = await axios.get(apiPath);
      res.json(transform(response.data));
    } catch (error) {
      sendDataRobotError(res, error);
    }
  };
}

// Example API routes - fetch and expose real DataRobot data to the frontend.
app.get("/api/me", proxyToDataRobot("/account/info/"));
app.get("/api/projects", proxyToDataRobot("/projects/"));
app.get("/api/version", proxyToDataRobot("/version/"));
app.get(
  "/api/deployments",
  proxyToDataRobot("/deployments/", (data) =>
    unwrapList(data).map((item) => ({ ...item, url: `${getAppHost()}/deployments/${item.id}` }))
  )
);
app.get(
  "/api/use-cases",
  proxyToDataRobot("/useCases/", (data) =>
    unwrapList(data).map((item) => ({ ...item, url: `${getAppHost()}/usecases/${item.id}/overview` }))
  )
);
app.get(
  "/api/llm-models",
  proxyToDataRobot("/genai/llmgw/catalog/", (data) => unwrapList(data).map((item) => item.model))
);

// Forward a conversation to the DataRobot LLM Gateway (OpenAI-compatible chat completions).
app.post("/api/chat", async (req, res) => {
  try {
    const response = await axios.post("/genai/llmgw/chat/completions/", req.body);
    res.json(response.data);
  } catch (error) {
    sendDataRobotError(res, error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
