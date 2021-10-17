import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactQuill, { Quill } from "react-quill";

import "react-quill/dist/quill.snow.css";
import { ImageDrop } from "quill-image-drop-module";
import ImageResize from "quill-image-resize-module-react";
import "./Editor.css";
import MenuButton from "./menubutton.svg";
import Converter from "./Converter";
import Mirror from "./Mirror";
const axios = require("axios");

var toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  [],

  [{ header: 1 }, { header: 2 }], // custom button values


  [{ direction: "rtl" }], // text direction

  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];

export default function Editor(props) {
  Quill.register("modules/imageDrop", ImageDrop);
  Quill.register("modules/imageResize", ImageResize);

  useEffect(() => {
    if (quill == null) return;

    quill.root.innerHTML = props.editorStatus;
  }, [props.editorStatus]);

  const [quill, setQuill] = useState();

  const showConverter = useRef(false);

  const showmenuArea = useRef(false);

  const [components, setComponents] = useState([]);

  const [showShowMode, setShowShowMode] = useState(false);

  const [converterStyle, setConverterStyle] = useState("EditorConverter");

  const [menuAreaStyle, setMenuAreaStyle] = useState("menuButtonArea");

  const currentContent = useRef("");

  const movableList = useRef([]);

  const allComponents = useRef("");

  const allIDs = useRef(["___0"]);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    wrapperRef.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      modules: {
        toolbar: toolbarOptions,
        imageResize: {
          parchment: Quill.import("parchment"),
          modules: ["Resize", "DisplaySize", "Toolbar"],
        },
        imageDrop: {},
      },
      theme: "snow",
    });

    setQuill(q);
  }, []);

  useEffect(() => {
    if (quill == null) return;

    axios({
      method: "GET",
      url: "http://localhost:8080/",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      quill.root.innerHTML += res.data;
    });
  }, [quill]);

  useEffect(() => {
    if (quill == null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      //currentContent.current = quill.root.innerHTML;

      currentContent.current = quill.root.innerHTML;
    };
    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [quill]);

  function arrangeHTMLTAG(content, id, type) {
 

    return "<" + type + " id=" + id + ">" + content + "</" + type + ">";
  }


  function getLongNewID(wishedID){

    

      if(wishedID < 10){

        return  "___" + wishedID;
      }
        
      else if(wishedID >= 10 && wishedID < 100){
        return  "__" + wishedID;
      }
       

      else if(wishedID >= 100 && wishedID < 1000){
        return  "_" + wishedID;
      }
   
     
   
    }
  

  function getIDfromString(item){

    if(item !== ""){

      return parseInt(item.replaceAll("_", " "));
    }
    
  }


  function getHighestID(){

    let templist = [];
    for(let i = 0; i < allIDs.current.length; i++){

      
      templist.push(getIDfromString(allIDs.current[i]));

    }

    return Math.max(...templist);
  }

  function makeComponentsFromContent(content) {
  

    let temp = "";
    let component = "";
    let components = [];
    let closeTagCountDown = 4;
    let countDown = 0;
    let openingTag = "";
    let closingTag = "";
    let tagContent = "";
    let approvedTag = false;
    let occupiedMoreThanOnce = [];
    let isImage = false;

    for(let i = 0; i < content.length; i++){

      if(content[i] + content[i+1] + content[i+2] === "<p>"){
        // console.log(getLongNewID(2));
         
       
       
       
        openingTag = '<p id="' + getLongNewID(getHighestID() + 1) + '">';
        allIDs.current.push(getLongNewID(getHighestID() + 1));
        closeTagCountDown--;
        closeTagCountDown--;
        approvedTag = true;
        countDown = 3; 
        console.log(allIDs.current);
      }

      if(content[i] + content[i+1] + content[i+2] + content[i+3] === "<h1>"){
        console.log("HITTADE ÖPPNING")
        openingTag = '<h1 id="' + getLongNewID(getHighestID() + 1) + '">';
        allIDs.current.push(getLongNewID(getHighestID() + 1));
        closeTagCountDown--;
        closeTagCountDown--;
        approvedTag = true;
        countDown = 4; 
      }

      if(content[i] + content[i+1] + content[i+2] + content[i+3] === "<h2>"){
        console.log("HITTADE ÖPPNING")
        openingTag = '<h2 id="' + getLongNewID(getHighestID() + 1) + '">';
        allIDs.current.push(getLongNewID(getHighestID() + 1));
        closeTagCountDown--;
        closeTagCountDown--;
        approvedTag = true;
        countDown = 4; 
      }


     


      if(content[i] + content[i+1] + content[i+2] +content[i+3] + content[i+4] + content[i+5] + content[i+6] === '<p id="'){
        
        if(!occupiedMoreThanOnce.includes(content[i+7] + content[i+8] + content[i+9] + content[i+10])){
          console.log("HITTADE ÖPPNING MED ID");
          openingTag = '<p id="' + content[i+7] + content[i+8] + content[i+9] + content[i+10] + '">';
          closeTagCountDown--;
          closeTagCountDown--;
          approvedTag = true;
          countDown = 13; 
          occupiedMoreThanOnce.push(content[i+7] + content[i+8] + content[i+9] + content[i+10]);
        }
        else{
          console.log("HITTADE ÖPPNING MED ID SOM REDAN PÅTRÄFFATS");
        

          openingTag = '<p id="' + getLongNewID(getHighestID() + 1) + '">';
          allIDs.current.push(getLongNewID(getHighestID() + 1));
        
          closeTagCountDown--;
          closeTagCountDown--;
          approvedTag = true;
          countDown = 13; 
        }
      }


      if(content[i] + content[i+1] + content[i+2] +content[i+3] + content[i+4] + content[i+5] + content[i+6] + content[i+7] === '<h1 id="'){
        
        if(!occupiedMoreThanOnce.includes(content[i+8] + content[i+9] + content[i+10] + content[i+11])){
          console.log("HITTADE ÖPPNING MED ID");
          openingTag = '<h1 id="' + content[i+8] + content[i+9] + content[i+10] + content[i+11] + '">';
          closeTagCountDown--;
          closeTagCountDown--;
          approvedTag = true;
          countDown = 14; 
          occupiedMoreThanOnce.push(content[i+8] + content[i+9] + content[i+10] + content[i+11]);
        }
        else{
          console.log("HITTADE ÖPPNING MED ID SOM REDAN PÅTRÄFFATS");
          openingTag = '<h1 id="' + getLongNewID(getHighestID() + 1) + '">';
          allIDs.current.push(getLongNewID(getHighestID() + 1));
          closeTagCountDown--;
          closeTagCountDown--;
          approvedTag = true;
          countDown = 14; 
        }
      }

      if(content[i] + content[i+1] + content[i+2] +content[i+3] + content[i+4] + content[i+5] + content[i+6] + content[i+7] === '<h2 id="'){
        
        if(!occupiedMoreThanOnce.includes(content[i+8] + content[i+9] + content[i+10] + content[i+11])){
          console.log("HITTADE ÖPPNING MED ID");
          openingTag = '<h2 id="' + content[i+8] + content[i+9] + content[i+10] + content[i+11] + '">';
          closeTagCountDown--;
          closeTagCountDown--;
          approvedTag = true;
          countDown = 14; 
          occupiedMoreThanOnce.push(parseInt(content[i+8] + content[i+9] + content[i+10] + content[i+11]))
        }
        else{
          console.log("HITTADE ÖPPNING MED ID SOM REDAN PÅTRÄFFATS");
          openingTag = '<h2 id="' + getLongNewID(getHighestID() + 1) + '">';
          allIDs.current.push(getLongNewID(getHighestID() + 1));
          closeTagCountDown--;
          closeTagCountDown--;
          approvedTag = true;
          countDown = 14; 
        }
      }




      if(content[i] + content[i+1] + content[i+2] + content[i+3] === "</p>"){
        console.log("HITTADE STÄNGING")
        closingTag = "</p>";
        closeTagCountDown = 0;
        approvedTag = true;
        countDown = 4; 
      }

      if(content[i] + content[i+1] + content[i+2] + content[i+3] + content[i+4] === "</h1>"){
        console.log("HITTADE STÄNGING")
        closingTag = "</h1>";
        closeTagCountDown = 0;
        approvedTag = true;
        countDown = 5; 
      }

      if(content[i] + content[i+1] + content[i+2] + content[i+3] + content[i+4] === "</h2>"){
        console.log("HITTADE STÄNGING")
        closingTag = "</h2>";
        closeTagCountDown = 0;
        approvedTag = true;
        countDown = 5; 
      }

      if(content[i] + content[i+1] + content[i+2] + content[i+3] === "<br>"){
       console.log("HITTADE BAN BR"); 
        approvedTag = false;
        countDown = 4; 
      }

     

   
      if(closeTagCountDown === 2 && countDown === 0 && approvedTag){
        tagContent += content[i];     
      }
      else{
        countDown--;
      }
   
      if(closeTagCountDown === 0 && approvedTag){
   
        component = openingTag + tagContent + closingTag;

        if(tagContent != ""){
          temp += component;
          components.push(component);
        }
       
        component = "";
        closeTagCountDown = 4;
        closingTag = "";
        tagContent = "";
        openingTag = "";
        countDown = 0;
        approvedTag = false;
      
      }
    }

    console.log(components);

    components.forEach((element) => (allComponents.current += element));

    setComponents(components); //SKA VARA EN ARRAY MED ALL HTML FÖR VARJE TAGG
    movableList.current = components;
    return temp;
  }


  function onMenuClickHandler() {
    if (!showConverter.current) {
      setConverterStyle("EditorConverter animateEditorConverter");

      showConverter.current = true;
    } else {
      setConverterStyle("EditorConverter animateBackEditorConverter");

      showConverter.current = false;
    }

    if (!showmenuArea.current) {
      setMenuAreaStyle("menuButtonArea animateMenuArea");

      showmenuArea.current = true;
    } else {
      setMenuAreaStyle("menuButtonArea animateBackMenuArea");

      showmenuArea.current = false;
    }
  }

  function onSaveHandler(_cardname, _carddesc) {
    props.createPost(_cardname, currentContent.current);
  }

  function onDeleteHandler() {
    props.deletePost();
  }

  useEffect(() => {

    if(showShowMode){
      makeComponentsFromContent(quill.root.innerHTML);
      console.log("VISNINGSLÄGE!")
    }
    else{
      console.log("EDITORLÄGE!")

      if (quill == null) return;
      if (currentContent.current == null || "") {
      } else if (quill.root.innerHTML != null || quill.root.innerHTML === "") {
        let temp = "";
        console.log(movableList.current);
        movableList.current.map((item) => {
          console.log(item);
          temp += item;
        });
  
        quill.root.innerHTML = temp;
      }
    }
  }, [showShowMode]);

  function onSetShowModeHandler() {
    if (showShowMode) {
      setShowShowMode(false);
    } else {
      setShowShowMode(true);
    }
  }

  function sendMovableData(data) {

    // console.log("DATAN!!! :::: " +data)
    
    // movableList.current.push(data);
    // console.log("MOVABLE CURRENT:::: " + movableList.current)
    // let templist = [];
    // let takenIDs = [];


    // for(let i = 0; i < movableList.current.length; i++){
       
    //     if(!takenIDs.includes(movableList.current[i][1])){
         
    //       templist.push(movableList.current[i]);
    //       takenIDs.push(movableList.current[i][1]);
    //     }
    
    //    }


    //    console.log("TEMPLIST:::: " + templist);
    // movableList.current = templist;
  


}
  return (
    <div id="Editor">
      <div onClick={onMenuClickHandler} className={menuAreaStyle}>
        <svg
          className="MenuButton"
          alt="MBUTTON"
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 938 938"
        >
          <defs></defs>
          <g>
            <path
              className="cls-1"
              d="M469,925C217.09,924.84,13,720.5,13.16,468.6A456.14,456.14,0,0,1,291.5,48.83C523.56-49.2,791.15,59.5,889.18,291.5S878.56,791.14,646.5,889.17A452.83,452.83,0,0,1,469,925Z"
            />
            <path
              className="cls-2"
              d="M469,25.5c245,.18,443.48,199,443.3,444A443.63,443.63,0,0,1,641.62,877.7C415.92,973,155.68,867.36,60.34,641.7s10.34-485.94,236-581.28A440.69,440.69,0,0,1,469,25.5m0-25C210.25.5.5,210.25.5,469S210.25,937.5,469,937.5,937.5,727.75,937.5,469,727.75.5,469,.5Z"
            />
          </g>
          <g>
            <path
              className="cls-3 first"
              d="M679,384H259a15,15,0,0,1-15-15h0a15,15,0,0,1,15-15H679a15,15,0,0,1,15,15h0A15,15,0,0,1,679,384Z"
            />
            <path
              className="cls-3"
              d="M726.6,484H211.4c-10.16,0-18.4-6.72-18.4-15h0c0-8.28,8.24-15,18.4-15H726.6c10.16,0,18.4,6.72,18.4,15h0C745,477.28,736.76,484,726.6,484Z"
            />
            <path
              className="cls-3"
              d="M679,584H259a15,15,0,0,1-15-15h0a15,15,0,0,1,15-15H679a15,15,0,0,1,15,15h0A15,15,0,0,1,679,584Z"
            />
          </g>
        </svg>
      </div>

      <div id="container" ref={wrapperRef}>
        <Mirror
          sendMovableDataFromMirror={sendMovableData}
          components={components}
          showMode={showShowMode}
        ></Mirror>
      </div>

      <Converter
        onSetShowMode={onSetShowModeHandler}
        onSave={onSaveHandler}
        onDelete={onDeleteHandler}
        converterStyle={converterStyle}
      ></Converter>
    </div>
  );
}
