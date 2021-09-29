const express = require('express');
const path = require("path");
const app = express();
const port = process.env.PORT || 8080;
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());


mongoose.connect("mongodb:localhost:27017/NoteLadDatabase",
{
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}

);

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

const Spanish = new Note({id: 42, content: "Spanish"});
Spanish.save();


app.get("/notes", function (req, res) {

 

  res.send()
});


app.get("/", function (req, res) {
    res.send("<h1 style='font-size: 5rem'>this is from the server</h1>")
  });



  app.get("/111", function (req, res) {
    res.send("<h1 style='font-size: 5rem'>Animals</h1>")
  });

  app.get("/222", function (req, res) {
    res.send("<h1 style='font-size: 5rem'>History</h1>")
  });


  app.get("/255", function (req, res) {
    res.send("<h1 style='font-size: 5rem'>English</h1>")
  });

  app.get("/355", function (req, res) {
    res.send("<h1 style='font-size: 5rem'>Swedish</h1>")
  });




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})