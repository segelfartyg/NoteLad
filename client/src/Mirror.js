import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import "./Mirror.css";
import NoteLadMovable from "./NoteLadMovable";

export default function Mirror(props) {
  const [chosenComp, setChosenComp] = useState();
  const [currentX, setCurrentX] = useState();
  const [currentY, setCurrentY] = useState();
  const [currentAngle, setCurrentAngle] = useState();
  const [showComponents, setShowComponents] = useState();

  const themeStyle = {
    background:
      "linear-gradient(" +
      props.theme.toolbarGradientAngle +
      "deg, " +
      props.theme.toolbarColor1 +
      " 0%, " +
      props.theme.toolbarColor2 +
      " 50%, " +
      props.theme.toolbarColor3 +
      " 100%)",
  };
  let style = "mirrorArea ";

  if (props.showMode) {
    style += "show";
  } else {
    style = "mirrorArea ";
  }

  function sendMovableData(data) {
    props.sendMovableDataFromMirror(data);
  }

  const components = [
    props.components.map((component) => (
      <NoteLadMovable
        frame={props.currentFrameRef}
        frameState={props.currentFrame}
        key={Math.random}
        setChosenComp={setChosenComp}
        chosenComp={chosenComp}
        setCurrentX={setCurrentX}
        currentX={currentX}
        currentAngle={currentAngle}
        setCurrentY={setCurrentY}
        currentY={currentY}
        sendMovableData={sendMovableData}
        clickHandlerChooseComp={clickHandlerChooseComp}
        componentData={component}
      >
        {}
      </NoteLadMovable>
    )),
  ];

  useEffect(() => {}, [props.currentFrame]);

  // const [currentAngle, setCurrentAngle] = useState();

  useEffect(() => {}, [chosenComp]);

  useEffect(() => {}, [currentX]);

  function clickHandlerChooseComp(_chosenComp, x, y, angle) {
    setChosenComp(_chosenComp);
    setCurrentX(x);
    setCurrentY(y);
    setCurrentAngle(angle);
  }

  return (
    <div className={props.mirrorStyle}>
      <div className={props.topBarStyle} style={themeStyle}>
        <div className="firstColTool"></div>

        <div className="secondColTool">
          <input
            type="number"
            placeholder="angle"
            value={currentAngle}
            onChange={(e) => setCurrentAngle(e.target.value)}
          ></input>

          <input
            type="number"
            placeholder="width"
            value={currentX}
            onChange={(e) => setCurrentX(e.target.value)}
          ></input>

          <input
            type="number"
            placeholder="height"
            value={currentY}
            onChange={(e) => setCurrentY(e.target.value)}
          ></input>
        </div>
      </div>
      <div className={style}>
        <div className="mirrorMainArea">
              {components[0]}
        </div>
      </div>
    </div>
  );
}
