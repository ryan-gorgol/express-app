const express = require("express")
const mongoose = require("mongoose")
const session = require("express-session")
const redis = require("redis")

let RedisStore = require("connect-redis")(session)

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET } = require("./config/config")

let redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
})


const roomRouter = require("./routes/roomRoutes")
const userRouter = require("./routes/userRoutes")

const app = express();

// MONGO DB CONNECTION
const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

const connectWithRetry = () => {
  mongoose.connect(mongoUrl)
    .then(() => console.log("successfully connected to DB"))
    .catch((e) => {
      console.log(e); 
      setTimeout(connectWithRetry, 5000)
    });
}
connectWithRetry();

// app.use(session({
//   store: new RedisStore({ client: redisClient }),
//   secret: SESSION_SECRET,
//   cookie: {
//     secure: false,
//     resave: false,
//     saveUnitialized: false,
//     httpOnly: true,
//     maxAge: 1296000000 //15 days
//   }
// }))

// json middleware
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "50.116.10.181"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// APP ROUTES
app.get("/", (req, res, next) => {
  res.send("<h2>Hi there!!</h2>")
  next();
});

app.use("/api/v1/rooms", roomRouter);
// app.use('/api/v1/users', userRouter);

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`listening on port ${port}`))