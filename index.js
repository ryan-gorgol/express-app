const express = require("express")
const mongoose = require("mongoose")
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require("./config/config")

// docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

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
app.get("/", (req, res) => {
  res.send("<h2>Hi there!</h2>")
});

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`listening on port ${port}`))