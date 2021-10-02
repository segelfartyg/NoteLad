const express = require('express');
const path = require("path");
const app = express();
const port = process.env.PORT || 8080;
const cors = require("cors");
const mongoose = require("mongoose");
const bp = require("body-parser");


app.use(bp.json());
app.use(bp.urlencoded( { extended: true } ));


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
  userid:{
    type: Number,
    required: true,
  },
  name:{
    type: String,
    default: "",
  },
  content:{
    type: String,
    default: "",
  }

});

const Note = mongoose.model("Note", NoteSchema);

const Animals = new Note({id: 1, userid: 1, name: "Animals", content: "<h1 style='font-size: 40px'>Animals<h1>"});


const History = new Note({id: 2, userid: 1, name: "History", content: "<h1 style='font-size: 40px'>History<h1>"});


const English = new Note({id: 3, userid: 1, name: "English", content: "<h1 style='font-size: 40px'>English<h1>"});


const Swedish = new Note({id: 4, userid: 1, name: "Swedish", content: "<h1 style='font-size: 40px'>Swedish<h1>"});



const Drugs = new Note({id: 5, userid: 1, name: "Drugs", content: "<h1 style='font-size: 40px'>Drugs<h1>"});

// Animals.save();
// History.save();
// English.save();
// Swedish.save();
// Drugs.save();


async function getNoteContent(_postID){

  const content = await Note.find()
  .select({ content: true })
  .where("id")
  .equals(_postID)


return content[0].content;

}


async function getNoteList(_userID){

  const notes = await Note.find()
  .select({ name: true })
  .where("userid")
  .equals(_userID)

;
return notes;

}



app.get("/notes", function (req, res) {

 

  res.send()
});


app.get("/getNotes", async function (req, res) {

  if(req.query.userid){
    const response = await getNoteList(req.query.userid);
    console.log(response);
    res.send(response);
 
  }
  else{

  }
 
  });


  app.get("/", async function (req, res) {

    if(req.query.id){
      const response = await getNoteContent(req.query.id);
      res.send(response);
    }
    else{
  
    }
   
    });


  app.post("/add", async function (req, res) {

 
    const newNote = new Note({id: 4, userid: 1, name: req.body.noteName, content: req.body.content});

    newNote.save()
    .then(savedDoc => {
      res.send("SAVED TO DB");
    });

   
    });




const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})

const io = require("socket.io")(server, options);

io.on("connection", (socket) => {

  console.log("CONNECTED TO SOCKET");
  
  
  
  });
  
 