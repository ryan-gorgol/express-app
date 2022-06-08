const express = require("express")
const mongoose = require("mongoose")
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require("./config/config")

// docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

const app = express();

mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`)
  .then(() => console.log("successfully connected to DB"))
  .catch((e) => console.log(e))

app.get("/", (req, res) => {
  res.send("<h2>Hi there!</h2>")
});

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`listening on port ${port}`))