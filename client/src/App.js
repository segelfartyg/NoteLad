
import React, {useState, useEffect} from "react";

import './App.css';
import NavBar from "./NavBar";
import Editor from "./Editor";
const axios = require("axios");

function App() {


const [editorStatus, setEditorStatus] = useState("");




  function sendGetRequest(endpoint){

    let endpointurl = "http://localhost:8080/";
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
  
    </div>
  );
}

export default App;
