import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import QuillResize from "quill-resize-module";
import ImageUploader from "quill-image-uploader";
import "./Editor.css";
import MenuButton from "./menubutton.svg";
import Converter from "./Converter";
import Mirror from "./Mirror";
const axios = require("axios");


// QUILL TOOLBAR OPTIONS
var toolbarOptions = [
  ["image"],
  [{ header: [1, 2, 3, false] }],
  [{ align: [] }],
];



// THE EDITOR ITSELF
export default function Editor(props) {

  // REGISTER QUILL MODULES
  Quill.register("modules/imageUploader", ImageUploader);
  Quill.register("modules/resize", QuillResize);



  // SETS THE INNERHTML TO THE EDITORSTATUS WHEN THE STATUS IS SET
  useEffect(() => {
    if (quill == null) return;
    quill.root.innerHTML = props.editorStatus;
  }, [props.editorStatus]);

  // THIS HANDLES THE IMAGE UPLOADING
  function imageHandler() {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async function () {
      const file = input.files[0];
      console.log(file);
      console.log("User trying to uplaod this:", file);
      var imageID;
      let formdata = new FormData();
      formdata.append("image", file);

      axios({
        method: "POST",
        url: "http://localhost:8080/images",
        headers: {},
        data: formdata,
      })
        .then((res) => {
          console.log(res);

          const link = "http://localhost:3000/images/" + res.data;
          const range = quill.getSelection();

          quill.insertEmbed(range.index, "image", link);
        })
        .catch((err) => {
          return "CANT UPLOAD";
        });
    };
  }

  // THE QUILL EDITOR VARIABLE
  const [quill, setQuill] = useState();

  // VARIABLE FOR SHOWING THE CONVERTER
  const showConverter = useRef(false);

  // VARIABLE FOR SHOWING THE MENUBUTTON AND ITS AREA
  const showmenuArea = useRef(false);

  // VARIABLE FOR STORING THE CURRENT COMPONENTS
  const [components, setComponents] = useState([]);

  // VARIABLE FOR SHOWING THE SHOWMODE OR NOT
  const [showShowMode, setShowShowMode] = useState(false);

  // REF FOR CONTINOUSLY SAVING USERS INPUT IN THE EDITOR
  const currentContent = useRef("");

  // LISTS ALL THE COMPONENTS FOR LATER GETTING PUT INTO THE EDITOR AFTER SHOWMODE
  const movableList = useRef([]);

  // SAME AS currentContent, BUT FOR THE COMPONENTS
  const allComponents = useRef("");

  // ALL OCCUPIED ID:S
  const allIDs = useRef(["___0"]);

  // BOOLEAN FOR SHOWING OR NOT SHOWING THE EDITOR
  const [showEditor, setShowEditor] = useState("");

  // CURRENT CARD ([card, maxframes])
  const [currentCard, setCurrentCard] = useState([1, 1]);

  // CURRENT FRAME STATE VARIABLE
  const [currentFrame, setCurrentFrame] = useState(1);

  // CURRENT FRAME REF VARIABLE
  const currentFrameRef = useRef(1);

  // BOOLEAN FOR SETTING THE SHOWMODE IN PLAYMODE
  const playCard = useRef(false);

  // VARIABLE FOR SETTING THE SPEED OF PLAYMODE
  const animationSpeed = useRef(10);

  // STYLE FOR THE CONVERTER
  const [converterStyle, setConverterStyle] = useState("EditorConverter");

  // STYLE FOR THE MENUBUTTON AND ITS AREA
  const [menuAreaStyle, setMenuAreaStyle] = useState("menuButtonArea");

  // STYLE FOR THE topBar
  const [topBarStyle, setTopBarStyle] = useState("topBarclosed");

  // STYLE FOR THE MIRROR AREA
  const [showPresentation, setShowPresentation] = useState(
    "entireMirror dontshowpresentation"
  );

  // STYLE FOR THE MENU, BASED ON THEME
  const menuStyle = {
    background:
      "linear-gradient(" +
      props.theme.menuButtonGradientAngle +
      "deg, " +
      props.theme.menuColor1 +
      " 0%, " +
      props.theme.menuColor2 +
      " 50%, " +
      props.theme.menuColor3 +
      " 100%",
  };

  // STYLE FOR THE BACKGROUND, BASED ON THEME
  const backgroundStyle = {
    background:
      "linear-gradient(" +
      props.theme.backgroundAngle +
      "deg, " +
      props.theme.background1 +
      " 0%, " +
      props.theme.background2 +
      " 50%, " +
      props.theme.background3 +
      " 100%",
  };


  //WRAPPER FOR THE ENTIRE EDITOR
  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    wrapperRef.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      modules: {
        toolbar: toolbarOptions,
        resize: {
          modules: ["Resize", "DisplaySize", "Toolbar"],
        },
      },
      theme: "snow",
    });
    setQuill(q);
  }, []);

  // useEffect FOR SETTING THE EDITOR CONTENT TO THE RESPONSE FROM SERVER
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


  // WHEN EDITOR IS UPDATED, SET currentContent ACCORDINGLY
  useEffect(() => {
    if (quill == null) return;
    var toolbar = quill.getModule("toolbar");
    toolbar.addHandler("image", imageHandler);
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

  // FUNCTION FOR GETTING A NEW ID-STRING
  function getLongNewID(wishedID) {
    if (wishedID < 10) {
      return "___" + wishedID;
    } else if (wishedID >= 10 && wishedID < 100) {
      return "__" + wishedID;
    } else if (wishedID >= 100 && wishedID < 1000) {
      return "_" + wishedID;
    }
  }

  // FUNCTION FOR GETTING THE ID NUMBER FROM THE ID-STRING
  function getIDfromString(item) {
    if (item !== "") {
      return parseInt(item.replaceAll("_", " "));
    }
  }

  // RETURNS THE HIGHEST OCCUPIED ID
  function getHighestID() {
    let templist = [];
    for (let i = 0; i < allIDs.current.length; i++) {
      templist.push(getIDfromString(allIDs.current[i]));
    }
    return Math.max(...templist);
  }

  // BIG FUNCTION FOR PARSING THE EDITOR CONTENT INTO COMPONENTS
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
    let imageTag = false;

    for (let i = 0; i < content.length; i++) {
      if (content[i] + content[i + 1] + content[i + 2] === "<p>") {
        openingTag = '<p id="' + getLongNewID(getHighestID() + 1) + '">';
        allIDs.current.push(getLongNewID(getHighestID() + 1));
        closeTagCountDown--;
        closeTagCountDown--;
        approvedTag = true;
        countDown = 3;
        console.log(allIDs.current);
      }

      if (
        content[i] + content[i + 1] + content[i + 2] + content[i + 3] ===
        "<h1>"
      ) {
        console.log("HITTADE ÖPPNING");
        openingTag = '<h1 id="' + getLongNewID(getHighestID() + 1) + '">';
        allIDs.current.push(getLongNewID(getHighestID() + 1));
        closeTagCountDown--;
        closeTagCountDown--;
        approvedTag = true;
        countDown = 4;
      }

      if (
        content[i] + content[i + 1] + content[i + 2] + content[i + 3] ===
        "<h2>"
      ) {
        console.log("HITTADE ÖPPNING");
        openingTag = '<h2 id="' + getLongNewID(getHighestID() + 1) + '">';
        allIDs.current.push(getLongNewID(getHighestID() + 1));
        closeTagCountDown--;
        closeTagCountDown--;
        approvedTag = true;
        countDown = 4;
      }

      if (
        content[i] +
          content[i + 1] +
          content[i + 2] +
          content[i + 3] +
          content[i + 4] +
          content[i + 5] +
          content[i + 6] +
          content[i + 7] +
          content[i + 8] +
          content[i + 9] ===
        '<img src="'
      ) {
        console.log("HITTADE ÖPPNING");
        openingTag = '<img id="' + getLongNewID(getHighestID() + 1) + '" src="';
        allIDs.current.push(getLongNewID(getHighestID() + 1));
        closeTagCountDown = 10;
        approvedTag = true;
        countDown = 10;
        imageTag = true;
      }

      if (
        content[i] +
          content[i + 1] +
          content[i + 2] +
          content[i + 3] +
          content[i + 4] +
          content[i + 5] +
          content[i + 6] ===
        '<p id="'
      ) {
        if (
          !occupiedMoreThanOnce.includes(
            content[i + 7] + content[i + 8] + content[i + 9] + content[i + 10]
          )
        ) {
          console.log("HITTADE ÖPPNING MED ID");
          openingTag =
            '<p id="' +
            content[i + 7] +
            content[i + 8] +
            content[i + 9] +
            content[i + 10] +
            '">';
          closeTagCountDown--;
          closeTagCountDown--;
          approvedTag = true;
          countDown = 13;
          occupiedMoreThanOnce.push(
            content[i + 7] + content[i + 8] + content[i + 9] + content[i + 10]
          );
        } else {
          console.log("HITTADE ÖPPNING MED ID SOM REDAN PÅTRÄFFATS");

          openingTag = '<p id="' + getLongNewID(getHighestID() + 1) + '">';
          allIDs.current.push(getLongNewID(getHighestID() + 1));

          closeTagCountDown--;
          closeTagCountDown--;
          approvedTag = true;
          countDown = 13;
        }
      }

      if (
        content[i] +
          content[i + 1] +
          content[i + 2] +
          content[i + 3] +
          content[i + 4] +
          content[i + 5] +
          content[i + 6] +
          content[i + 7] ===
        '<h1 id="'
      ) {
        if (
          !occupiedMoreThanOnce.includes(
            content[i + 8] + content[i + 9] + content[i + 10] + content[i + 11]
          )
        ) {
          console.log("HITTADE ÖPPNING MED ID");
          openingTag =
            '<h1 id="' +
            content[i + 8] +
            content[i + 9] +
            content[i + 10] +
            content[i + 11] +
            '">';
          closeTagCountDown--;
          closeTagCountDown--;
          approvedTag = true;
          countDown = 14;
          occupiedMoreThanOnce.push(
            content[i + 8] + content[i + 9] + content[i + 10] + content[i + 11]
          );
        } else {
          console.log("HITTADE ÖPPNING MED ID SOM REDAN PÅTRÄFFATS");
          openingTag = '<h1 id="' + getLongNewID(getHighestID() + 1) + '">';
          allIDs.current.push(getLongNewID(getHighestID() + 1));
          closeTagCountDown--;
          closeTagCountDown--;
          approvedTag = true;
          countDown = 14;
        }
      }

      if (
        content[i] +
          content[i + 1] +
          content[i + 2] +
          content[i + 3] +
          content[i + 4] +
          content[i + 5] +
          content[i + 6] +
          content[i + 7] ===
        '<h2 id="'
      ) {
        if (
          !occupiedMoreThanOnce.includes(
            content[i + 8] + content[i + 9] + content[i + 10] + content[i + 11]
          )
        ) {
          console.log("HITTADE ÖPPNING MED ID");
          openingTag =
            '<h2 id="' +
            content[i + 8] +
            content[i + 9] +
            content[i + 10] +
            content[i + 11] +
            '">';
          closeTagCountDown--;
          closeTagCountDown--;
          approvedTag = true;
          countDown = 14;
          occupiedMoreThanOnce.push(
            parseInt(
              content[i + 8] +
                content[i + 9] +
                content[i + 10] +
                content[i + 11]
            )
          );
        } else {
          console.log("HITTADE ÖPPNING MED ID SOM REDAN PÅTRÄFFATS");
          openingTag = '<h2 id="' + getLongNewID(getHighestID() + 1) + '">';
          allIDs.current.push(getLongNewID(getHighestID() + 1));
          closeTagCountDown--;
          closeTagCountDown--;
          approvedTag = true;
          countDown = 14;
        }
      }

      if (
        content[i] +
          content[i + 1] +
          content[i + 2] +
          content[i + 3] +
          content[i + 4] +
          content[i + 5] +
          content[i + 6] +
          content[i + 7] +
          content[i + 8] ===
        '<img id="'
      ) {
        imageTag = true;
        if (
          !occupiedMoreThanOnce.includes(
            content[i + 9] + content[i + 10] + content[i + 11] + content[i + 12]
          )
        ) {
          console.log("HITTADE ÖPPNING MED ID");
          openingTag =
            '<img id="' +
            content[i + 9] +
            content[i + 10] +
            content[i + 11] +
            content[i + 12] +
            '" ';
          closeTagCountDown = 1000;
          closeTagCountDown = 1000;
          approvedTag = true;
          countDown = 14;
          occupiedMoreThanOnce.push(
            parseInt(
              content[i + 9] +
                content[i + 10] +
                content[i + 11] +
                content[i + 12]
            )
          );
        } else {
          console.log("HITTADE ÖPPNING MED ID SOM REDAN PÅTRÄFFATS");
          openingTag = '<img id="' + getLongNewID(getHighestID() + 1) + '" ';
          allIDs.current.push(getLongNewID(getHighestID() + 1));
          closeTagCountDown--;
          closeTagCountDown--;
          approvedTag = true;
          countDown = 14;
        }
      }

      if (content[i] + content[i + 1] === '">' && imageTag) {
        closingTag = '">';
        closeTagCountDown = 0;
        approvedTag = true;
        countDown = 2;
        imageTag = false;
      }

      if (
        content[i] + content[i + 1] + content[i + 2] + content[i + 3] ===
        "</p>"
      ) {
        console.log("HITTADE STÄNGING");
        closingTag = "</p>";
        closeTagCountDown = 0;
        approvedTag = true;
        countDown = 4;
      }

      if (
        content[i] +
          content[i + 1] +
          content[i + 2] +
          content[i + 3] +
          content[i + 4] ===
        "</h1>"
      ) {
        console.log("HITTADE STÄNGING");
        closingTag = "</h1>";
        closeTagCountDown = 0;
        approvedTag = true;
        countDown = 5;
      }

      if (
        content[i] +
          content[i + 1] +
          content[i + 2] +
          content[i + 3] +
          content[i + 4] ===
        "</h2>"
      ) {
        console.log("HITTADE STÄNGING");
        closingTag = "</h2>";
        closeTagCountDown = 0;
        approvedTag = true;
        countDown = 5;
      }

      if (
        content[i] + content[i + 1] + content[i + 2] + content[i + 3] ===
        "<br>"
      ) {
        console.log("HITTADE BAN BR");
        approvedTag = false;
        countDown = 4;
      }

      if (imageTag && countDown === 0) {
        tagContent += content[i];
      } else if (
        closeTagCountDown === 2 &&
        countDown === 0 &&
        approvedTag &&
        !imageTag
      ) {
        tagContent += content[i];
      } else {
        countDown--;
      }

      if (closeTagCountDown === 0 && approvedTag) {
        component = openingTag + tagContent + closingTag;
        console.log(component);
        if (tagContent != "") {
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

    components.forEach((element) => (allComponents.current += element));

    setComponents(components); //SKA VARA EN ARRAY MED ALL HTML FÖR VARJE TAGG
    movableList.current = components;
    return temp;
  }

  // HANDLER FOR PRESSING THE MENUBUTTON
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

  // HANDLER FOR PRESSING SAVE NOTE
  function onSaveHandler(_cardname, _carddesc) {
    props.createPost(_cardname, currentContent.current);
  }
  // HANDLER FOR PRESSING DELETE NOTE
  function onDeleteHandler() {
    props.deletePost();
  }

  // WHEN PRESSING SWITCH MODE
  useEffect(() => {
    if (showShowMode) {
      setCurrentFrame(1);
      currentFrameRef.current = 1;
      makeComponentsFromContent(quill.root.innerHTML);
      setTopBarStyle("topBar");
      setShowEditor("hide");
      setShowPresentation("entireMirror showpresentation");
    } else {
      setCurrentFrame(1);
      currentFrameRef.current = 1;
      if (quill == null) return;
      if (currentContent.current == null || "") {
      } else if (quill.root.innerHTML != null || quill.root.innerHTML === "") {
        let temp = "";
        console.log(movableList.current);
        movableList.current.map((item) => {
          console.log(item);
          temp += item;
        });
        setShowEditor("donthide");
        setShowPresentation("entireMirror dontshowpresentation");
        setTopBarStyle("topBar topBarclosed");
        quill.root.innerHTML = temp;
      }
    }
  }, [showShowMode]);

  // SWITCHES THE VALUE OF showShowMode
  function onSetShowModeHandler() {
    if (showShowMode) {
      setShowShowMode(false);
    } else {
      setShowShowMode(true);
    }
  }

  // ADDS A NEW FRAME TO CARD 1
  function onNewFrame() {
    setCurrentCard([1, currentCard[1] + 1]);
    setCurrentFrame(currentCard[1] + 1);
    currentFrameRef.current = currentCard[1] + 1;
  }

  // FIRES OF WHEN NAVIGATING BETWEEN FRAMES ON CARD 1
  function navigateToFrame(data) {
    if (data.target.value <= currentCard[1] && data.target.value > 0) {
      setCurrentFrame(data.target.value);
      currentFrameRef.current = data.target.value;
    }
  }

  // HANDLER FOR PRESSING THE PLAY BUTTON
  function onPlayButtonHandler(data) {
    if (playCard.current) {
      playCard.current = false;
    } else {
      playCard.current = true;
      loopBFFrames();
    }
  }

  // LOOPS THROUGH ALL THE FRAMES FROM CARD 1
  function loopBFFrames(data) {
    let iterations = 0;
    let animationsTime = 100;

    if (animationSpeed.current.value != null) {
      console.log(animationSpeed.current.value);
      animationsTime = animationSpeed.current.value;
    }

    var interval = setInterval(function () {
      iterations++;
      if (iterations === currentCard[1]) {
        clearInterval(interval);

        var interval2 = setInterval(function () {
          iterations--;
          if (iterations === 1) {
            clearInterval(interval2);
            loopBFFrames();
          }

          if (!playCard.current) {
            clearInterval(interval2);
          }
          setCurrentFrame(iterations);
          currentFrameRef.current = iterations;
        }, animationsTime);
      }
      if (!playCard.current) {
        clearInterval(interval);
      }
      setCurrentFrame(iterations);
      currentFrameRef.current = iterations;
    }, animationsTime);
  }

  return (
    <div style={backgroundStyle} id="Editor">
      <div
        onClick={onMenuClickHandler}
        className={menuAreaStyle}
        style={menuStyle}
      >
        <svg
          className="MenuButton"
          alt="MBUTTON"
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 938 938"
        >
          <defs>
            <linearGradient id="grad1" x1="0%" y1="00%" x2="10%" y2="100%">
              <stop offset="0%" stop-color="#f5f5f5" />
              <stop offset="50%" stop-color="#fdfdfd" />
              <stop offset="100%" stop-color="#d8d8d8" />
            </linearGradient>
          </defs>
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

      <div id="container" className={showEditor} ref={wrapperRef}>
        <style
          dangerouslySetInnerHTML={{
            __html:
              `.ql-toolbar.ql-snow { background: linear-gradient(` +
              props.theme.toolbarGradientAngle +
              `deg, ` +
              props.theme.toolbarColor1 +
              ` 0%, ` +
              props.theme.toolbarColor2 +
              ` 50%, ` +
              props.theme.toolbarColor3 +
              ` 100%) } 
      `,
          }}
        />
      </div>
      <Mirror
        theme={props.theme}
        currentCard={currentCard}
        currentFrame={currentFrame}
        currentFrameRef={currentFrameRef}
        mirrorStyle={showPresentation}
        topBarStyle={topBarStyle}
        components={components}
        showMode={showShowMode}
      ></Mirror>
      <Converter
        theme={props.theme}
        animationSpeed={animationSpeed}
        onPlayButtonHandler={onPlayButtonHandler}
        currentCard={currentCard}
        currentFrame={currentFrame}
        navigateToFrame={navigateToFrame}
        newFrame={onNewFrame}
        onSetShowMode={onSetShowModeHandler}
        onSave={onSaveHandler}
        onDelete={onDeleteHandler}
        converterStyle={converterStyle}
      ></Converter>
    </div>
  );
}
