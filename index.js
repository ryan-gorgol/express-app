const express = require("express")
const mongoose = require("mongoose")

// docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

const app = express();

mongoose.connect("mongodb://mongoadmin:Password1@mongo:27017/?authSource=admin")
  .then(() => console.log("successfully connected to DB"))
  .catch((e) => console.log(e))

app.get("/", (req, res) => {
  res.send("<h2>Hi there</h2>")
});

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`listening on port ${port}`))