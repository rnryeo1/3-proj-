const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/codingTest/getLast.php",
    createProxyMiddleware({
      target: "http://211.44.24.167:9002",
      changeOrigin: true,
    })
  );
  app.use(
    "/ws-stomp",
    createProxyMiddleware({ target: "http://211.44.24.167:9002", ws: true })
  );
};
