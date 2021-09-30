const express = require('express');
const path = require("path");
const app = express();
const port = process.env.PORT || 8080;
const cors = require("cors");
const mongoose = require("mongoose");


app.use(cors());
const options = {
  cors: true,
  origins: ["http://localhost:3000"],
};




mongoose.connect("mongodb://localhost/NoteLadDB")
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log("Couldnt connect ti MongoDB"));


const NoteSchema = new mongoose.Schema({
  id:{
    type: Number,
    required: true,
  },
  content:{
    type: String,
    default: "",
  }

});

const Note = mongoose.model("Note", NoteSchema);

const Animals = new Note({id: 1, content: "<h1 style='font-size: 40px'>Animals<h1>"});


const History = new Note({id: 2, content: "<h1 style='font-size: 40px'>History<h1>"});


const English = new Note({id: 3, content: "<h1 style='font-size: 40px'>English<h1>"});


const Swedish = new Note({id: 4, content: "<h1 style='font-size: 40px'>Swedish<h1>"});



async function getNoteContent(_postID){

  const content = await Note.find()
  .select({ content: true })
  .where("id")
  .equals(_postID)


return content[0].content;

}

getNoteContent(2);


app.get("/notes", function (req, res) {

 

  res.send()
});


app.get("/", async function (req, res) {

  if(req.query.id){
    const response = await getNoteContent(req.query.id);
    res.send(response);
  }
  else{

  }
 
  });




const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})

const io = require("socket.io")(server, options);

io.on("connection", (socket) => {

  console.log("CONNECTED TO SOCKET");
  
  
  
  });
  
 