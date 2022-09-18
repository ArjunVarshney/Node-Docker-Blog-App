const express = require("express");
const cors = require("cors")
const session = require("express-session");
let RedisStore = require("connect-redis")(session);
const redis = require("redis");
const mongoose = require("mongoose");
const {
  MONGO_PORT,
  MONGO_IP,
  MONGO_PASSWORD,
  MONGO_USER,
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET,
} = require("./config/config");
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");
const redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
});

const app = express();
const port = process.env.PORT || 3000;

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
const connectToMongo = () => {
  mongoose
    .connect(mongoURL)
    .then(() => {
      console.log("Connected successfully");
    })
    .catch((err) => {
      console.log(err);
      setTimeout(connectToMongo, 5000);
    });
};
connectToMongo();

redisClient.on("error", function (err) {
  console.log("Could not establish a connection with redis. " + err);
});
redisClient.on("connect", function (err) {
  console.log("Connected to redis successfully");
});

app.enable("trust proxy");
app.use(cors());
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 2,
      httpOnly: false,
    },
  })
);

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hi there");
  console.log("running");
});

app.use("/posts", postRouter);
app.use("/users", userRouter);
app.listen(port, () => {
  console.log("Listening at port " + port);
});
