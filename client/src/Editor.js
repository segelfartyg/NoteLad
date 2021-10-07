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
  ["image", "blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
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
      if (source !== "user") return
      //currentContent.current = quill.root.innerHTML;

      currentContent.current = makeComponentsFromContent(quill.root.innerHTML);

      console.log("NUVARANDE: " +currentContent.current);
    }
    quill.on("text-change", handler)

    return () => {
      quill.off("text-change", handler)
    }
   
  }, [quill]);

  function makeComponentsFromContent(content) {
    let temp = "";
    let counted = 0;
    let components = [];
    let component = "";
    console.log("HTML: " + content);
    let tagid = 1;
    let foundID = false;
    let acceptable = true;
    let newID = 1;

    let closed = 0;

    let tagfound = false;

    for (let i = 0; i < content.length; i++) {

      if(content[i] == "<"){

        
          if(!foundID){
            if(content[i] == "i"){
              foundID = true;
              acceptable = false;
            }

            if(content[i] == "i" && !foundID){
              tagid = content[i] + "d=" + content[i + 3];

              temp += tagid;
              component += tagid

              foundID = true;
              acceptable = false;   
            }
          }

      }

      if(acceptable){
        temp += content[i];

  
        component += content[i];
        console.log("TEMP:::: " + temp);
        console.log("COMPPP:::: " + component);
        if(content[i] == ">"){


          closed++;
          if(!foundID){

            //console.log("EYYYYY: " + component[component.length - 1]);

            console.log("STRÄNG INNNAN: " + component);

            let newcomponent = "";
            for(let j = 0; j < component.length - 1; j++){
              newcomponent += component[j];
            }
          
            newcomponent += " id=" + newID + ">";
            component = newcomponent;

            console.log("STRÄNG EFTER: " + component);

            
            let newtemp = "";
            for(let j = 0; j < temp.length - 1; j++){
              newtemp += temp[j];
            }
          
            temp = newtemp;
            temp += " id=" + newID + ">";
            newID++;

            foundID = true;
          }

          if(closed == 2){

            components.push(component);
            component = "";
            closed = 0;
            foundID = false;
           
          }
        
        }
        
      }
      else{
        acceptable = true;
      }


     
    }

    setComponents(components); //SKA VARA EN ARRAY MED ALL HTML FÖR VARJE TAGG
    console.log(components);
    console.log(temp); //SKA VARA HELA HTML STRÄNGEN, DET SOM SKA FINNAS I EDITORN
    return temp;
  }

  function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

  // useEffect(() => {

  //   if(showConverter){
  //     converterStyle = "EditorConverter animateEditorConverter";

  //   }
  //   else{
  //     converterStyle = "EditorConverter animateBackEditorConverter";
  //   }

  //   }, [showConverter]);

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
    console.log(_cardname, _carddesc);
    props.createPost(_cardname, currentContent.current);
  }

  function onDeleteHandler() {
    props.deletePost();
  }


  function test(){

    console.log(currentContent.current);
    quill.root.innerHTML = makeComponentsFromContent(currentContent.current);
  }

  useEffect(() => {
    if (quill == null) return;
    if(currentContent.current == null || ""){

    }
    else if(quill.root.innerHTML != null || quill.root.innerHTML == ""){
      quill.root.innerHTML = currentContent.current;
    }
     
   
  }, [showShowMode]);

  function onSetShowModeHandler() {
    if (showShowMode) {
      console.log("set to falase");
      setShowShowMode(false);
    } else {
      console.log("SET TO TRU");

      setShowShowMode(true);

     
    }
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
              class="cls-1"
              d="M469,925C217.09,924.84,13,720.5,13.16,468.6A456.14,456.14,0,0,1,291.5,48.83C523.56-49.2,791.15,59.5,889.18,291.5S878.56,791.14,646.5,889.17A452.83,452.83,0,0,1,469,925Z"
            />
            <path
              class="cls-2"
              d="M469,25.5c245,.18,443.48,199,443.3,444A443.63,443.63,0,0,1,641.62,877.7C415.92,973,155.68,867.36,60.34,641.7s10.34-485.94,236-581.28A440.69,440.69,0,0,1,469,25.5m0-25C210.25.5.5,210.25.5,469S210.25,937.5,469,937.5,937.5,727.75,937.5,469,727.75.5,469,.5Z"
            />
          </g>
          <g>
            <path
              class="cls-3 first"
              d="M679,384H259a15,15,0,0,1-15-15h0a15,15,0,0,1,15-15H679a15,15,0,0,1,15,15h0A15,15,0,0,1,679,384Z"
            />
            <path
              class="cls-3"
              d="M726.6,484H211.4c-10.16,0-18.4-6.72-18.4-15h0c0-8.28,8.24-15,18.4-15H726.6c10.16,0,18.4,6.72,18.4,15h0C745,477.28,736.76,484,726.6,484Z"
            />
            <path
              class="cls-3"
              d="M679,584H259a15,15,0,0,1-15-15h0a15,15,0,0,1,15-15H679a15,15,0,0,1,15,15h0A15,15,0,0,1,679,584Z"
            />
          </g>
        </svg>
      </div>

      <div id="container" ref={wrapperRef}>
        <Mirror components={components} showMode={showShowMode}></Mirror>
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
