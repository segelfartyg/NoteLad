const express = require('express');
const path = require("path");
const app = express();
const port = process.env.PORT || 8080;
const cors = require("cors");
const mongoose = require("mongoose");
const autoIncriment = require("mongoose-auto-increment");
const AutoIncrement = require('mongoose-sequence')(mongoose);
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
.catch((err) => console.log("Couldnt connect to MongoDB"));



const NoteSchema = new mongoose.Schema({

  // noteID:{
  //   type: Number,
  //   required: true
  // },

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




NoteSchema.plugin(AutoIncrement, {inc_field : "noteID"});



const Note = mongoose.model("Note", NoteSchema);

const Animals = new Note({ noteID: 1, userid: 1, name: "Animals", content: "<h1 style='font-size: 40px'>Animals<h1>"});


const History = new Note({ userid: 1, name: "History", content: "<h1 style='font-size: 40px'>History<h1>"});


const English = new Note({userid: 1, name: "English", content: "<h1 style='font-size: 40px'>English<h1>"});


const Swedish = new Note({ userid: 1, name: "Swedish", content: "<h1 style='font-size: 40px'>Swedish<h1>"});



const Drugs = new Note({ userid: 1, name: "Drugs", content: "<h1 style='font-size: 40px'>Drugs<h1>"});

//Animals.save();
// History.save();
// English.save();
// Swedish.save();
// Drugs.save();



// RESET THE NOTEID COUNTER:

// Note.counterReset('noteID', function(err) {
//   // Now the counter is 0
// });

async function getNoteContent(_userID, _postID){

  const content = await Note.find()
  .select({ content: true, 
  noteID: true})
  .where("noteID")
  .equals(_postID)
  .where("userid")
  .equals(_userID)

console.log(content[0].content);

let arranged = content[0].content;
console.log("FÖRE: " + arranged);
console.log("EFTER: " + addClassToParagraphs(arranged));
console.log(arranged);
return [addClassToParagraphs(arranged),  content[0].noteID];

}


function addClassToParagraphs(_html){


  let temp = "";
  let counted = 0;

  console.log("HTML: " + _html)
for(let i = 0; i < _html.length; i++){




  if(_html[i] == "<" && counted == 0){

    temp += "<";
    
    if(_html[i + 1] == "p"){
   
      temp += "p class='TEST'>";
      counted =  3;
    }
  
  }
  else if(counted == 0){

  temp += _html[i];

  }

 
  if(counted > 0){
    counted--;
  }






}

return temp;
}


async function getNoteList(_userID){

  

  const notes = await Note.find()
  .select({ name: true,
  noteID : true })
  .where("userid")
  .equals(_userID)

;
return notes;

}



app.get("/notes", function (req, res) {
  res.send()
});


app.get("/getNotes", async function (req, res) {


  if(req.query.userID){
   
    const response = await getNoteList(req.query.userID);
 
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


    app.get("/getNoteContent", async function (req, res) {

      if(req.query.userID && req.query.noteID){
     
        const response = await getNoteContent(req.query.userID, req.query.noteID);
        res.send(response);
      }
      else{
    
      }
     
      });


  app.post("/add", async function (req, res) {

 
    const newNote = new Note({noteID: 4, userid: 1, name: req.body.noteName, content: req.body.content});

    newNote.save()
    .then(savedDoc => {
      res.send("SAVED TO DB");
    });

   
    });



    app.post("/delete", async function (req, res) {

 
      console.log("RADERAR: ", req.body.noteID);
      Note.deleteOne({noteID:req.body.noteID},function(err, foundNote){
        if(!err)
            console.log(foundNote, " REMOVED");
    });
      res.send("DELETED");
     
      });




const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})

const io = require("socket.io")(server, options);

io.on("connection", (socket) => {

  console.log("CONNECTED TO SOCKET");
  
  
  
  });
  
 