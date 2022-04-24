const PROXY_CONFIG = {
  "/api/": {
    "target" : "http://" + process.env.API_HOST_URL || "http://localhost:8080",
    "secure": false,
    "logLevel": "debug"
  }
};
module.exports = PROXY_CONFIG;