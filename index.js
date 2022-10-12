const express = require("express")
const mongoose = require("mongoose")
const session = require("cookie-session")
const redis = require("redis")
const cookieSession = require("cookie-parser")
const cors = require("cors")

require('dotenv').config();

const PORT = process.env.PORT
const MONGO_IP = process.env.MONGO_IP
const MONGO_USER = process.env.MONGO_USER
const MONGO_PORT = process.env.MONGO_PORT
const MONGO_PASSWORD = process.env.MONGO_PASSWORD
const REDIS_URL = process.env.REDIS_URL
const REDIS_PORT = process.env.REDIS_PORT
const SESSION_SECRET = process.env.SESSION_SECRET

// let RedisStore = require("connect-redis")(session)

// let redisClient = redis.createClient({
//   host: REDIS_URL,
//   port: REDIS_PORT,
// })

const app = express();
app.use(cookieSession())
app.use(express.json());

const roomRouter = require("./routes/roomRoutes")
const userRouter = require("./routes/userRoutes")

// MONGO DB CONNECTION
const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

const connectWithRetry = () => {
  mongoose.connect(mongoUrl)
    .then(() => console.log("successfully connected to DB"))
    .catch((e) => {
      console.log(e); 
      setTimeout(connectWithRetry, 2500)
    });
}
connectWithRetry();

app.use(session({
  // store: new RedisStore({ client: redisClient }),
  name: "session",
  secret: SESSION_SECRET,
  cookie: {
    secure: false,
    resave: false,
    saveUnitialized: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24
   }
}))

const corsConfig = {
  credentials: true,
  origin: true,
};
app.use(cors(corsConfig));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// APP ROUTES
app.get("/", (req, res) => {
  res.send("<h2>Hi there!!</h2>")
});

app.use("/api/v1/rooms", roomRouter);
app.use('/api/v1/users', userRouter);

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`))