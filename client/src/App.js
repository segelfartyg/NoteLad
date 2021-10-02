
import React, {useState, useEffect, useRef} from "react";
import './App.css';
import NavBar from "./NavBar";
import Editor from "./Editor";
import socketClient from "socket.io-client";
import NoteLadHeader from "./noteladheader.svg"
const axios = require("axios");


const SERVER = "/";
var socket = socketClient(SERVER);

function App() {


const [editorStatus, setEditorStatus] = useState("");

const [notes, setNotes] = useState([]);



useEffect(() => {
  

  let endpointurl = "http://localhost:8080/getNotes?userid=";
  endpointurl += "1";

  axios({
    method: "GET",
    url: endpointurl,
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {

    let templist = [];
    res.data.map((item) => {
      if(!templist.includes(item.name)){
        templist.push([item.name, item._id]);
      }
      
      
      
      
     
    }
   
  )
  console.log("DSADSA: ", templist);
  setNotes(templist);  
});

}, []);

useEffect(() => {
  console.log("FROM APPLAYER: ", notes);
 
}, [notes])



  async function sendGetRequest(endpoint){

    let endpointurl = "http://localhost:8080/?id=";
    endpointurl += endpoint;

    axios({
      method: "GET",
      url: endpointurl,
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
     setEditorStatus(res.data);
     
    
    });


  }


  async function sendPostRequest(_noteName, _content){

    let endpointurl = "http://localhost:8080/add";
    //endpointurl += endpoint;

    axios({
      method: "POST",
      url: endpointurl,
      headers: {
        "Content-Type": "application/json"
      },
      data:{
        noteName: _noteName,
        content : _content
      }
    }).then(res => {
   
      console.log(res);
     
    
    });


  }

  function createPostHandler(_notename, _currentcontent){


    sendPostRequest(_notename, _currentcontent);
  }

useEffect(() => {

  console.log(editorStatus);

}, [editorStatus])


  return (
    <div className="App">
    
        <NavBar noteList={notes} sendGetRequest={sendGetRequest}/>
        <Editor createPost={createPostHandler} editorStatus={editorStatus}/>
      
        <img className="NoteLadHeader" alt="NoteLadHeader" src={NoteLadHeader}></img>
  
    </div>
  );
}

export default App;
