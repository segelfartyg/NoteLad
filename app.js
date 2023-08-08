const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 8080;
const cors = require("cors");
const mongoose = require("mongoose");
const autoIncriment = require("mongoose-auto-increment");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const bp = require("body-parser");
const multer = require("multer");
const upload = multer({ dest: "./images/" });

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use(cors());
const options = {
  cors: true,
  origins: ["http://localhost:3000"],
};

app.use("/images", express.static("images"));

async function getNoteContent(_userID, _postID) {
  const content = await Note.find()
    .select({
      content: true,
      noteID: true,
    })
    .where("noteID")
    .equals(_postID)
    .where("userid")
    .equals(_userID);

  console.log(content[0].content);

  let arranged = content[0].content;
  console.log("FÖRE: " + arranged);
  console.log("EFTER: " + addClassToParagraphs(arranged));
  console.log(arranged);
  return [addClassToParagraphs(arranged), content[0].noteID];
}

function addClassToParagraphs(_html) {
  let temp = "";
  let counted = 0;
  console.log("HTML: " + _html);
  for (let i = 0; i < _html.length; i++) {
    if (_html[i] == "<" && counted == 0) {
      temp += "<";

      if (_html[i + 1] == "p") {
        temp += "p class='TEST'>";
        counted = 3;
      }
    } else if (counted == 0) {
      temp += _html[i];
    }

    if (counted > 0) {
      counted--;
    }
  }

  return temp;
}

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const io = require("socket.io")(server, options);

io.on("connection", (socket) => {
  console.log("CONNECTED TO SOCKET");
});
