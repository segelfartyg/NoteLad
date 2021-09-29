import React, {useState, useEffect, useRef, useCallback} from "react";
import ReactQuill, {Quill} from "react-quill";

import "react-quill/dist/quill.snow.css";
import  {ImageDrop}  from "quill-image-drop-module";
import  ImageResize  from "quill-image-resize-module-react";
import "./Editor.css";

const axios = require("axios");

var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['image', 'blockquote', 'code-block'],
  
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
  

    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
    
  
    ['clean']                                         // remove formatting button
  ];




export default function Editor(props) {



Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);


useEffect(() => {
  if (quill == null) return
    
      
      
    quill.root.innerHTML = props.editorStatus;
     
           

}, [props.editorStatus])    
           


const [quill, setQuill] = useState();





 const wrapperRef = useCallback(wrapper => {
     if(wrapper == null) return;
    wrapperRef.innerHTML = "";
        const editor = document.createElement("div");
        wrapper.append(editor);
        const q = new Quill(editor, { 
            modules: {
                toolbar: toolbarOptions,
                imageResize: {
                    parchment: Quill.import('parchment'),
                    modules: ['Resize', 'DisplaySize', "Toolbar"]
                },
                imageDrop: {
              },
            },   
            theme: "snow" });

            setQuill(q);
    }, []);

    useEffect(() => {
        if (quill == null) return
    
      
        axios({
            method: "GET",
            url: "http://localhost:8080/",
            headers: {
              "Content-Type": "application/json"
            }
          }).then(res => {
            quill.root.innerHTML += res.data;
          });
           

    
    
      }, [quill])
   
   
  
    return (
      
        <div id="Editor">
            <div id="container" ref={wrapperRef}></div>
        </div>
    )
}

