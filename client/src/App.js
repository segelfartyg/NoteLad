
import React, {useState, useEffect} from "react";
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

useEffect(() => {

  console.log(editorStatus);

}, [editorStatus])


  return (
    <div className="App">
    
        <NavBar sendGetRequest={sendGetRequest}/>
        <Editor editorStatus={editorStatus}/>
        <img className="NoteLadHeader" alt="NoteLadHeader" src={NoteLadHeader}></img>
  
    </div>
  );
}

export default App;
