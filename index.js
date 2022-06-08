const express = require("express")
const mongoose = require("mongoose")
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require("./config/config")

const roomRouter = require("./routes/roomRoutes")

const app = express();

const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

const connectWithRetry = () => {
  mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
    .then(() => console.log("successfully connected to DB"))
    .catch((e) => {
      console.log(e); 
      setTimeout(connectWithRetry, 5000)
    });
}

connectWithRetry();

app.use(express.json());

app.use("/rooms", roomRouter);

app.get("/", (req, res) => {
  res.send("<h2>Hi there!!</h2>")
});

app.get("/test", (req, res) => {
  res.send({
    "greeting": "hello there",
    "ok": "ok"
  })
})



const port = process.env.PORT || 3000

app.listen(port, () => console.log(`listening on port ${port}`))