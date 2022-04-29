const API_HOST_URL = process.env.API_HOST_URL || "localhost"
const API_HOST_PORT = process.env.API_HOST_PORT || "8080"

const PROXY_CONFIG = {
  "/api/": {
    "target": "http://" + API_HOST_URL + ":" + API_HOST_PORT,
    "secure": false,
    "logLevel": "debug"
  }
};
module.exports = PROXY_CONFIG;
