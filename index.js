const express = require("express")
const mongoose = require("mongoose")
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require("./config/config")

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

app.use(express.json());

// APP ROUTES
app.get("/", (req, res, next) => {
  res.send("<h2>Hi there!!</h2>")
  next();
});

app.use('/api/v1/rooms', roomRouter);
app.use('/api/v1/users', userRouter);

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`listening on port ${port}`))