require("dotenv").config();

const http = require("http");
const app = require("./app");
const connectDb = require("./config/dbConnection");

const port = normalizePort(process.env.PORT || 5001);

const init = async () => {
  try {
    const server = http.createServer(app);

    await connectDb();

    server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });

    server.on("error", onError);
  } catch (ex) {
    console.log(ex);
    process.exit(1);
  }
};

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

init();
