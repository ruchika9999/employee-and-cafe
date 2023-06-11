require("dotenv").config();
const http = require("http");
let server = require("./server");

const port = normalizePort(process.env.PORT || 5001);

server.set("port", port);

try {
  server = http.createServer(server);

  console.log(`Server listening on port ${port}`);
  server.listen(port);

  server.on("error", onError);
  server.on("listening", onListening);
} catch (ex) {
  console.log(ex);
}

function normalizePort(val) {
  const port = typeof val === "string" ? parseInt(val, 10) : val;
  if (isNaN(port)) {
    return val;
  } else if (port >= 0) {
    return port;
  } else {
    return false;
  }
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      console.log("on Error express JS", error);
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
}
