const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/emergency", require("./routes/emergency")(io));

io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);
});

server.listen(5000, () => console.log("🚀 Server running on port 5000"));