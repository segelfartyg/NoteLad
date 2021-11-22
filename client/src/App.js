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

const [currentUserID, setCurrentUserID] = useState("1");

const [currentNoteID, setCurrentNoteID] = useState("");


const [updated, setUpdated] = useState(false);


const [notes, setNotes] = useState([]);


const theme =
  
{
  "white":{ 
  "navbarColor1" : "rgb(255, 255, 255)",
  "navbarColor2" : "rgb(201, 201, 201)",
  "navbarColor3" : "rgb(100, 100, 100)",
  "borderColor": "black",
  "navBarGradientAngle": "180",
  "toolbarColor1": "rgb(255, 255, 255)",
  "toolbarColor2": "rgb(255, 255, 255)",
  "toolbarColor3": "rgb(190, 190, 190)",
  "toolbarGradientAngle": "90",
  "logoColor1": "rgb(255, 255, 255)",
  "logoColor2": "rgb(255, 255, 255)",
  "logoColor3": "rgb(190, 190, 190)",
  "menuButtonGradientAngle": "180",
  "converterColor": "white",
  "menuColor1": "rgb(255, 255, 255)",
  "menuColor2": "rgb(201, 201, 201)",
  "menuColor3": "rgb(100, 100, 100)",
},


"Patrick":{ 
  "navbarColor1" : "#25b031",
  "navbarColor2" : "#52da5e",
  "navbarColor3" : "#2ac537",
  "backgroundAngle": "90",
  "background1" : "#25b03161",
  "background2" : "#52da5e61",
  "background3" : "#2ac53761",
  "borderColor": "black",
  "navBarGradientAngle": "180",
  "toolbarColor1": "#25b031",
  "toolbarColor2": "#52da5e",
  "toolbarColor3": "#1f9128",
  "toolbarGradientAngle": "90",
  "logoColor1": "#ffc500",
  "logoColor2": "#ffde00",
  "logoColor3": "#fdff00",
  "menuButtonGradientAngle": "180",
  "converterColor": "#52da5e",
  "menuColor1": "#25b031",
  "menuColor2": "#52da5e",
  "menuColor3": "#1f9128",
},

"Pepper":{ 
  "navbarColor1" : "#c31b00",
  "navbarColor2" : "#ff2a08",
  "navbarColor3" : "#660500",
  "borderColor": "#2b000a",
  "navBarGradientAngle": "180",
  "toolbarColor1": "#c31b00",
  "toolbarColor2": "#ff2a08",
  "toolbarColor3": "#660500",
  "toolbarGradientAngle": "90",
  "logoColor1": "#25b031",
  "logoColor2": "#52da5e",
  "logoColor3": "#2ac537",
  "menuButtonGradientAngle": "180",
  "converterColor": "#52da5e",
  "menuColor1": "#25b031",
  "menuColor2": "#52da5e",
  "menuColor3": "#1f9128",
},

"Midas":{ 
  "navbarColor1" : "#DBB42C",
  "navbarColor2" : "#EDC531",
  "navbarColor3" : "#FAD643",
  "borderColor": "#2b000a",
  "backgroundAngle": "90",
  "background1" : "#DBB42C61",
  "background2" : "#EDC53161",
  "background3" : "#FAD64361",
  "navBarGradientAngle": "180",
  "toolbarColor1": "#DBB42C",
  "toolbarColor2": "#EDC531",
  "toolbarColor3": "#FAD643",
  "toolbarGradientAngle": "90",
  "logoColor1": "#ffc500",
  "logoColor2": "#ffde00",
  "logoColor3": "#fdff00",
  "menuButtonGradientAngle": "180",
  "converterColor": "#FAD643",
  "menuColor1": "#B69121",
  "menuColor2": "#C9A227",
  "menuColor3": "#DBB42C",
},

"Sapphire":{ 
  "navbarColor1" : "#2196F3",
  "navbarColor2" : "#1E88E5",
  "navbarColor3" : "#1976D2",
  "borderColor": "#2b000a",
  "backgroundAngle": "90",
  "background1" : "#2196F361",
  "background2" : "#1E88E561",
  "background3" : "#1976D261",
  "navBarGradientAngle": "180",
  "toolbarColor1": "#2196F3",
  "toolbarColor2": "#1E88E5",
  "toolbarColor3": "#1976D2",
  "toolbarGradientAngle": "90",
  "logoColor1": "#48CAE4",
  "logoColor2": "#48CAE4",
  "logoColor3": "#00B4D8",
  "menuButtonGradientAngle": "180",
  "converterColor": "#1976D2",
  "menuColor1": "#1976D2",
  "menuColor2": "#1565C0",
  "menuColor3": "#1976D2",
},


}

const [currentTheme, setCurrentTheme] = useState(theme.Sapphire);




console.log(currentTheme);


useEffect(() => {
  

  let endpointurl = "http://localhost:8080/getNotes?userID=";
  endpointurl += currentUserID;

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
        templist.push([item.name, item.noteID]);
      }  
    }
  )
  setNotes(templist);  
});
setUpdated(false);

}, [updated]);


useEffect(() => {
  

  let endpointurl = "http://localhost:8080/getNotes?userID=";
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
        templist.push([item.name, item.noteID]);
      }  
    }
  )
  setNotes(templist);  
});

}, []);

useEffect(() => {
  
  
}, [notes])



  async function sendGetRequest(endpoint){

    let endpointurl = "http://localhost:8080/getNoteContent?userID=1&noteID=";
    endpointurl += endpoint;

    axios({
      method: "GET",
      url: endpointurl,
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {

      setEditorStatus(res.data[0]);
     
     setCurrentNoteID(res.data[1]);
    
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
        setUpdated(true); 
    });
  }

  async function sendDeleteRequest(){

    let endpointurl = "http://localhost:8080/delete";
    //endpointurl += endpoint;

    axios({
      method: "POST",
      url: endpointurl,
      headers: {
        "Content-Type": "application/json"
      },
      data:{
        noteID: currentNoteID,
        userID : currentUserID
      }
    }).then(res => {
        setUpdated(true); 
    });
  }

  function createPostHandler(_notename, _currentcontent){
    sendPostRequest(_notename, _currentcontent);
  }

  function deletePostHandler(){
    sendDeleteRequest();
    setEditorStatus("");
  }

// useEffect(() => {



// }, [editorStatus])
function setEditorStatusHandler(content){

setEditorStatus(content);


}

function onNewNoteHandler(){

  setEditorStatus("");
}


  return (
    <div className="App">
    

        <NavBar theme={currentTheme} newNote={onNewNoteHandler} noteList={notes} sendGetRequest={sendGetRequest}/>
        <Editor theme={currentTheme} createPost={createPostHandler} editorStatus={editorStatus} setEditorStatus={setEditorStatusHandler} deletePost={deletePostHandler}/>
  
        {/* <img className="NoteLadHeader" alt="NoteLadHeader" src={NoteLadHeader}></img>
   */}
    </div>
  );
}

export default App;
