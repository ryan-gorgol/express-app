const express = require("express")

// docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

const app = express();

app.get("/", (req, res) => {
  res.send("<h2>Hi there, sexy</h2>")
});

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`listening on port ${port}`))