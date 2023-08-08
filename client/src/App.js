import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import NavBar from "./NavBar";
import Editor from "./Editor";
import socketClient from "socket.io-client";
import NoteLadHeader from "./noteladheader.svg";

const axios = require("axios");

const SERVER = "/";
var socket = socketClient(SERVER);

function App() {


  // VARIABLE FOR SETTING THE QUILL EDITOR TO GET REQUEST RESPONSE
  const [editorStatus, setEditorStatus] = useState("");

  // SETS THE CURRENT USERID, MADE FOR FUTURE FUNCTIONALITY
  const [currentUserID, setCurrentUserID] = useState("1");

  // THE SAME AS ABOVE IMPLIES
  const [currentNoteID, setCurrentNoteID] = useState("");

  // VARIABLE MADE FOR LISTENING, UPDATES NAVBAR AFTER CHANGES
  const [updated, setUpdated] = useState(false);

  // LIST OF NOTES IN THE NAVBAR
  const [notes, setNotes] = useState([]);

  // LIST OF THEMES
  
  const theme = {
    white: {
      navbarColor1: "rgb(255, 255, 255)",
      navbarColor2: "rgb(201, 201, 201)",
      navbarColor3: "rgb(100, 100, 100)",
      borderColor: "black",
      navBarGradientAngle: "180",
      toolbarColor1: "rgb(255, 255, 255)",
      toolbarColor2: "rgb(255, 255, 255)",
      toolbarColor3: "rgb(190, 190, 190)",
      toolbarGradientAngle: "90",
      logoColor1: "rgb(255, 255, 255)",
      logoColor2: "rgb(255, 255, 255)",
      logoColor3: "rgb(190, 190, 190)",
      menuButtonGradientAngle: "180",
      converterColor: "white",
      menuColor1: "rgb(255, 255, 255)",
      menuColor2: "rgb(201, 201, 201)",
      menuColor3: "rgb(100, 100, 100)",
    },

    Patrick: {
      navbarColor1: "#25b031",
      navbarColor2: "#52da5e",
      navbarColor3: "#2ac537",
      backgroundAngle: "90",
      background1: "#25b03161",
      background2: "#52da5e61",
      background3: "#2ac53761",
      borderColor: "black",
      navBarGradientAngle: "180",
      toolbarColor1: "#25b031",
      toolbarColor2: "#52da5e",
      toolbarColor3: "#1f9128",
      toolbarGradientAngle: "90",
      logoColor1: "#ffc500",
      logoColor2: "#ffde00",
      logoColor3: "#fdff00",
      menuButtonGradientAngle: "180",
      converterColor: "#52da5e",
      menuColor1: "#25b031",
      menuColor2: "#52da5e",
      menuColor3: "#1f9128",
    },

    Pepper: {
      navbarColor1: "#c31b00",
      navbarColor2: "#ff2a08",
      navbarColor3: "#660500",
      borderColor: "#2b000a",
      navBarGradientAngle: "180",
      toolbarColor1: "#c31b00",
      toolbarColor2: "#ff2a08",
      toolbarColor3: "#660500",
      toolbarGradientAngle: "90",
      logoColor1: "#25b031",
      logoColor2: "#52da5e",
      logoColor3: "#2ac537",
      menuButtonGradientAngle: "180",
      converterColor: "#52da5e",
      menuColor1: "#25b031",
      menuColor2: "#52da5e",
      menuColor3: "#1f9128",
    },

    Midas: {
      navbarColor1: "#DBB42C",
      navbarColor2: "#EDC531",
      navbarColor3: "#FAD643",
      borderColor: "#2b000a",
      backgroundAngle: "90",
      background1: "#DBB42C61",
      background2: "#EDC53161",
      background3: "#FAD64361",
      navBarGradientAngle: "180",
      toolbarColor1: "#DBB42C",
      toolbarColor2: "#EDC531",
      toolbarColor3: "#FAD643",
      toolbarGradientAngle: "90",
      logoColor1: "#ffc500",
      logoColor2: "#ffde00",
      logoColor3: "#fdff00",
      menuButtonGradientAngle: "180",
      converterColor: "#FAD643",
      menuColor1: "#B69121",
      menuColor2: "#C9A227",
      menuColor3: "#DBB42C",
    },

    Sapphire: {
      navbarColor1: "#2196F3",
      navbarColor2: "#1E88E5",
      navbarColor3: "#1976D2",
      borderColor: "#2b000a",
      backgroundAngle: "90",
      background1: "#2196F361",
      background2: "#1E88E561",
      background3: "#1976D261",
      navBarGradientAngle: "180",
      toolbarColor1: "#2196F3",
      toolbarColor2: "#1E88E5",
      toolbarColor3: "#1976D2",
      toolbarGradientAngle: "90",
      logoColor1: "#48CAE4",
      logoColor2: "#48CAE4",
      logoColor3: "#00B4D8",
      menuButtonGradientAngle: "180",
      converterColor: "#1976D2",
      menuColor1: "#1976D2",
      menuColor2: "#1565C0",
      menuColor3: "#1976D2",
    },
  };

  // STATE FOR STORING THE THEME, AND UPDATING IT
  const [currentTheme, setCurrentTheme] = useState(theme.Sapphire);



  // useEffect THAT LISTENS FOR ADDED NOTES IN THE NAVBARLIST AND SETS THE NAVBAR ACCORDINGLY

  useEffect(() => {
    let endpointurl = "http://localhost:8080/getNotes?userID=";
    endpointurl += currentUserID;

    axios({
      method: "GET",
      url: endpointurl,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      let templist = [];
      res.data.map((item) => {
        if (!templist.includes(item.name)) {
          templist.push([item.name, item.noteID]);
        }
      });
      setNotes(templist);
    });
    setUpdated(false);
  }, [updated]);

  // RUNS ON FIRST RENDER, SETS THE NAVBAR ITEMS

  useEffect(() => {
    let endpointurl = "http://localhost:8080/getNotes?userID=";
    endpointurl += "1";

    axios({
      method: "GET",
      url: endpointurl,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      let templist = [];
      res.data.map((item) => {
        if (!templist.includes(item.name)) {
          templist.push([item.name, item.noteID]);
        }
      });
      setNotes(templist);
    });
  }, []);

  useEffect(() => {}, [notes]);


  // FUNCTION FOR SENDING GET REQUESTS, RIGHT NOW IT IS RECIEVING NOTE 1 FROM USER 1

  async function sendGetRequest(endpoint) {
    let endpointurl = "http://localhost:8080/getNoteContent?userID=1&noteID=";
    endpointurl += endpoint;

    axios({
      method: "GET",
      url: endpointurl,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setEditorStatus(res.data[0]);

      setCurrentNoteID(res.data[1]);
    });
  }

  // THIS FUNCTION ADDS A NEW NOTE TO THE DATABASE

  async function sendPostRequest(_noteName, _content) {
    let endpointurl = "http://localhost:8080/add";
    //endpointurl += endpoint;

    axios({
      method: "POST",
      url: endpointurl,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        noteName: _noteName,
        content: _content,
      },
    }).then((res) => {
      setUpdated(true);
    });
  }

  // THIS FUNCTION DELETES NOTES

  async function sendDeleteRequest() {
    let endpointurl = "http://localhost:8080/delete";
    //endpointurl += endpoint;

    axios({
      method: "POST",
      url: endpointurl,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        noteID: currentNoteID,
        userID: currentUserID,
      },
    }).then((res) => {
      setUpdated(true);
    });
  }

  // FUNCTION FOR HANDLING THE CREATE POST FROM CHILD COMPONENTS
  function createPostHandler(_notename, _currentcontent) {
    sendPostRequest(_notename, _currentcontent);
  }

  // FUNCTION FOR HANDLING THE DELETE POST FROM CHILD COMPONENTS
  function deletePostHandler() {
    sendDeleteRequest();
    setEditorStatus("");
  }

  // SETS THE EDITOR STATUS FROM CHILD COMPONENTS
  function setEditorStatusHandler(content) {
    setEditorStatus(content);
  }

  
  // SETS THE EDITOR STATUS FROM CHILD COMPONENTS
  function onNewNoteHandler() {
    setEditorStatus("");
  }

  return (
    <div className="App">
      <svg id="signInMicrosoft" xmlns="http://www.w3.org/2000/svg" width="104" height="41" viewBox="0 0 104 41"><title>MS-SymbolLockup</title><rect width="104" height="41" fill="#fff"/><path d="M103,1V40H1V1H103m1-1H0V41H104V0Z" fill="#8c8c8c"/><rect x="13" y="11" width="9" height="9" fill="#f25022"/><rect x="13" y="21" width="9" height="9" fill="#00a4ef"/><rect x="23" y="11" width="9" height="9" fill="#7fba00"/><rect x="23" y="21" width="9" height="9" fill="#ffb900"/><path d="M45.812,25.082V23.288a2.849,2.849,0,0,0,.576.4,4.5,4.5,0,0,0,.707.3,5.513,5.513,0,0,0,.747.187,3.965,3.965,0,0,0,.688.065,2.937,2.937,0,0,0,1.637-.365,1.2,1.2,0,0,0,.538-1.062,1.16,1.16,0,0,0-.179-.649,1.928,1.928,0,0,0-.5-.5,5.355,5.355,0,0,0-.757-.435q-.437-.209-.935-.436c-.356-.19-.687-.383-1-.578a4.358,4.358,0,0,1-.8-.648,2.728,2.728,0,0,1-.534-.8,2.6,2.6,0,0,1-.194-1.047,2.416,2.416,0,0,1,.333-1.285,2.811,2.811,0,0,1,.879-.9,4.026,4.026,0,0,1,1.242-.528,5.922,5.922,0,0,1,1.42-.172,5.715,5.715,0,0,1,2.4.374v1.721a3.832,3.832,0,0,0-2.3-.645,4.106,4.106,0,0,0-.773.074,2.348,2.348,0,0,0-.689.241,1.5,1.5,0,0,0-.494.433,1.054,1.054,0,0,0-.19.637,1.211,1.211,0,0,0,.146.608,1.551,1.551,0,0,0,.429.468,4.276,4.276,0,0,0,.688.414c.271.134.584.28.942.436q.547.285,1.036.6a4.881,4.881,0,0,1,.856.7,3.015,3.015,0,0,1,.586.846,2.464,2.464,0,0,1,.217,1.058,2.635,2.635,0,0,1-.322,1.348,2.608,2.608,0,0,1-.868.892,3.82,3.82,0,0,1-1.257.5,6.988,6.988,0,0,1-1.5.155c-.176,0-.392-.014-.649-.04s-.518-.067-.787-.117a7.772,7.772,0,0,1-.761-.187A2.4,2.4,0,0,1,45.812,25.082Z" fill="#5e5e5e"/><path d="M55.129,16.426a1.02,1.02,0,0,1-.714-.272.89.89,0,0,1-.3-.688.916.916,0,0,1,.3-.7,1.008,1.008,0,0,1,.714-.278,1.039,1.039,0,0,1,.732.278.909.909,0,0,1,.3.7.9.9,0,0,1-.3.678A1.034,1.034,0,0,1,55.129,16.426Zm.842,9.074h-1.7V18h1.7Z" fill="#5e5e5e"/><path d="M65.017,24.9q0,4.131-4.153,4.131a6.187,6.187,0,0,1-2.556-.491V26.986a4.726,4.726,0,0,0,2.337.7,2.342,2.342,0,0,0,2.672-2.628V24.24h-.029a2.947,2.947,0,0,1-4.742.436,4.041,4.041,0,0,1-.838-2.684,4.738,4.738,0,0,1,.9-3.04,3,3,0,0,1,2.476-1.128,2.384,2.384,0,0,1,2.2,1.216h.029V18h1.7Zm-1.684-2.835v-.973a1.91,1.91,0,0,0-.524-1.352A1.718,1.718,0,0,0,61.5,19.18a1.793,1.793,0,0,0-1.512.714,3.217,3.217,0,0,0-.546,2,2.774,2.774,0,0,0,.524,1.769,1.678,1.678,0,0,0,1.387.662,1.805,1.805,0,0,0,1.429-.632A2.391,2.391,0,0,0,63.333,22.064Z" fill="#5e5e5e"/><path d="M73.908,25.5h-1.7V21.273q0-2.1-1.486-2.1a1.622,1.622,0,0,0-1.282.582,2.162,2.162,0,0,0-.5,1.469V25.5H67.229V18h1.707v1.245h.029A2.673,2.673,0,0,1,71.4,17.824a2.265,2.265,0,0,1,1.868.795,3.57,3.57,0,0,1,.644,2.3Z" fill="#5e5e5e"/><path d="M80.962,16.426a1.02,1.02,0,0,1-.714-.272.89.89,0,0,1-.3-.688.916.916,0,0,1,.3-.7,1.008,1.008,0,0,1,.714-.278,1.039,1.039,0,0,1,.732.278.909.909,0,0,1,.3.7.9.9,0,0,1-.3.678A1.034,1.034,0,0,1,80.962,16.426ZM81.8,25.5H80.1V18h1.7Z" fill="#5e5e5e"/><path d="M90.7,25.5H89V21.273q0-2.1-1.486-2.1a1.622,1.622,0,0,0-1.282.582,2.157,2.157,0,0,0-.506,1.469V25.5H84.023V18H85.73v1.245h.03a2.673,2.673,0,0,1,2.431-1.421,2.265,2.265,0,0,1,1.868.795,3.57,3.57,0,0,1,.644,2.3Z" fill="#5e5e5e"/></svg>
      <NavBar
        theme={currentTheme}
        newNote={onNewNoteHandler}
        noteList={notes}
        sendGetRequest={sendGetRequest}
      />
      <Editor
        theme={currentTheme}
        createPost={createPostHandler}
        editorStatus={editorStatus}
        setEditorStatus={setEditorStatusHandler}
        deletePost={deletePostHandler}
      />
    </div>
  );
}

export default App;
