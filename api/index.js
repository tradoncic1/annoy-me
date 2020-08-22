const fs = require("fs");
const say = require("say");
const cors = require("cors");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3001;
app.use(cors());
app.use(bodyParser.json());

app.post("/sendComment", (req, res) => {
  say.speak(req.body.comment, (err) => {
	if (err){
		console.log(err)
		res.status(400).send("NO")
	}
});

  console.log(
    req.body.comment,
    req.headers["user-agent"],
    req.connection.remoteAddress
  );
  fs.appendFile(
    "logs.txt",
    JSON.stringify({
      comment: req.body.comment,
      agent: req.headers["user-agent"],
      remoteAddress: req.connection.remoteAddress,
    }) + ",\n",
    function (err) {
      if (err) return console.log(err);
    }
  );

  res.status(200).send("OK");
});

app.get("/stopAudio", (req, res) => {
  say.stop();

  res.status(200).send("OK");
});

app.use("/", express.static("./../client/build"));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "./../client/build/index.html"), function (
    err
  ) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
