const express = require("express");
const { Server } = require("socket.io");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const authRouter = require("./routers/authRouter");
const session = require("express-session");
const server = require("http").createServer(app);
const Redis = require("ioredis");
const RedisStore = require("connect-redis") (session)
require("dotenv").config();
const path = require("path")
const PORT = process.env.PORT || 4000;



const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: "true",
  },
});

const redisClient = new Redis();
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    credentials: true,
    name: "sid",
    store: new RedisStore({client: redisClient}),
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.ENVIRONMENT === "production" ? "true" : "auto",
      httpOnly: true,
      expires: 1000 * 60 * 60 * 24 * 7,
      sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
    },
  })
);
app.use("/auth", authRouter);

io.on("connect", socket => {});
if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../client/build")))
}

app.get("*", (req,res)=>
{
  res.sendFile(path.join(__dirname, "../client/build/index.html"))
})

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
