import React, { useState, useEffect, useRef } from "react";
import "./NoteLadMovable.css";
import Draggable from "react-draggable";

export default function NoteLadMovable(props) {
 
 // CONTAINS SETTINGS FOR THE MOVABLE
const movableSettings = useRef([]);

// VARIABLE FOR THE DEGREES OF THE COMPONENT
const [degrees, setDegrees] = useState(0);

// VARIABLE FOR THE HEIGHT OF THE COMPONENT
const [pixelHeight, setPixelHeight] = useState(0);

// VARIABLE FOR THE WIDTH OF THE COMPONENT
const [pixelWidth, setPixelWidth] = useState(0);

// SETS THE STYLE FOR THE COMPONENT
const style = {
    transform: "rotate(" + degrees + "deg)",
    display: "flex"
  };

  // SETS CLASSNAME FOR MOVABLE
  let classname = "NoteLadMovable ";

  // CONTAINS ALL THE COORDINATES FOR ALL THE COMPONENTS
  const frameCords = useRef([]);

  // FUNCTION FOR MAKING THE COMPOSED HTML TAGS AND CONTENT TO NOTELAD COMPONENTS
  function componentFiltering(component) {
    let count = 0;
    let temp = "";
    let addToContent = false;
    let compID = "";
    let compStyle = "";
    let foundID = false;
    let imageTag = false;

    for (let i = 0; i < component.length; i++) {
      if (component[i] == "<") {
        addToContent = false;
      }

      if (!addToContent) {
        if (component[i] == "i" && !foundID) {
          if (component[i + 1] == "d") {
            if (component[i + 2] == "=") {
              compID =
                component[i + 3] +
                component[i + 4] +
                component[i + 5] +
                component[i + 6] +
                component[i + 7];
            }
          }
        }

        if (component[i] == "p" && compStyle == "") {
          compStyle = "p";
        }

        if (component[i] + component[i + 1] == "h1" && compStyle == "") {
          compStyle = "h1";
          classname += " h1";
        }

        if (component[i] + component[i + 1] == "h2" && compStyle == "") {
          compStyle = "h2";
          classname += " h2";
        }

        if (component[i] + component[i + 1] == "h3" && compStyle == "") {
          compStyle = "h3";
          classname += " h3";
        }

        if (
          component[i] + component[i + 1] + component[i + 2] == "img" &&
          compStyle == ""
        ) {
          compStyle = "img";
          classname += " img";
          imageTag = true;
        }
      }

      if (component[i] == ">") {
        foundID = true;
        addToContent = true;
      } else if ((addToContent && foundID) || imageTag) {
        if (component[i] + component[i + 1] + component[i + 2] == "&lt") {
          temp += "<";
          count = 4;
        }

        if (component[i] + component[i + 1] + component[i + 2] == "&gt") {
          temp += ">";
          count = 4;
        }

        if (
          imageTag &&
          component[i] +
            component[i + 1] +
            component[i + 2] +
            component[i + 3] +
            component[i + 4] ===
            'src="'
        ) {
          count = 4;

          addToContent = true;
        } else if (count == 0 && addToContent) {
          if (component[i] + component[i + 1] == '">') {
          } else {
            temp += component[i];
          }
        } else {
          count--;
        }
      }
    }

    return [temp, compID, compStyle];
  }

  // THE SPECIFIC COORDINATES FOR THIS SPECIFIC COMPONENT
  const [controlledPosition, setControlledPosition] = useState({
    x: 200,
    y: 200,
  });
  // const noteLadContent = componentFiltering(props.componentData);

  // PUSHES THE CURRENT COMPONENT AND ITS COORDINATES TO THE frameCords VARIABLE IF IT DOESNT EXIST IN IT
  useEffect(() => {
    if (frameCords.current.length <= 0) {
      frameCords.current.push([controlledPosition.x, controlledPosition.y]);
    } else {
      if (frameCords.current.length <= props.frame.current) {
        frameCords.current.push(
          frameCords.current[frameCords.current.length - 1]
        );
      } else {
        // setControlledPosition({x: frameCords.current[props.frame], y: frameCords.current[props.frame]});
      }
    }

    setControlledPosition({
      x: frameCords.current[props.frame.current - 1][0],
      y: frameCords.current[props.frame.current - 1][1],
    });
  }, [props.frameState]);

  // SETS THE SETTINGS FOR THE COMPONENT
  movableSettings.current = [
    componentFiltering(props.componentData),
    controlledPosition.x,
    controlledPosition.y,
    props.frame.current,
  ];

  function adjustXPos(e) {
    e.preventDefault();
    e.stopPropagation();
    const { x, y } = controlledPosition();
    setControlledPosition({ x: x - 10, y });
  }

  function adjustYPos(e) {
    e.preventDefault();
    e.stopPropagation();
    const { x, y } = controlledPosition;
    setControlledPosition({ x, y: y - 10 });
  }

  function onControlledDrag(e, position) {
    props.setChosenComp(movableSettings.current[0][1]);
    const { x, y } = position;
    setControlledPosition({ x, y });
    frameCords.current[props.frame.current - 1] = [
      parseInt(props.currentX),
      parseInt(props.currentY),
    ];

    props.setCurrentX(x);
    props.setCurrentY(y);
  }

  // HANDLER FOR PRESSING AND THEFORE SELECTING A COMPONENT
  function pressComponent(data) {
    props.clickHandlerChooseComp(
      movableSettings.current[0][1],
      controlledPosition.x,
      controlledPosition.y,
      degrees
    );
  }

  // CHANGES THE ANGLE OF THE CHOSEN COMPONENT WHEN CHANGING DEGREES IN UI
  useEffect(() => {
    if (props.chosenComp == movableSettings.current[0][1]) {
      setDegrees(props.currentAngle);
    }
  }, [props.currentAngle]);

  // CHANGES Y VALUE ON SELECTED COMPONENT ON CARD 1
  useEffect(() => {
    if (props.chosenComp == movableSettings.current[0][1]) {
      const { x, y } = controlledPosition;
      setControlledPosition({ x, y: parseInt(props.currentY) });
      frameCords.current[props.frame.current - 1] = [
        parseInt(props.currentX),
        parseInt(props.currentY),
      ];
    }
  }, [props.currentY]);

  //CHANGES X VALUE ON SELECTED COMPONENT ON CARD 1
  useEffect(() => {
    if (props.chosenComp == movableSettings.current[0][1]) {
      const { x, y } = controlledPosition;
      setControlledPosition({ x: parseInt(props.currentX), y });
      frameCords.current[props.frame.current - 1] = [
        parseInt(props.currentX),
        parseInt(props.currentY),
      ];
    }
  }, [props.currentX]);


  // CHECKS WHAT TYPE OF COMPONENT IT IS BEFORE RENDERING IT, IF IT IS TEXT IT PRINTS OUT THE TEXT, IF IT IS AN IMAGE, AN IMAGE IS RENDERED
  function arrangeComponent(component) {
    if (component[0][2] == "img") {
      return <img id={component[0][1]} src={component[0][0]} />;
    } else if (component[0][2] == "p") {
      console.log("p");
      return component[0][0];
    } else if (component[0][2] == "h1") {
      console.log("h1");

      return component[0][0];
    }
  }

  return (
    <Draggable
      bounds="parent"
      position={controlledPosition}
      onDrag={onControlledDrag}
    >
      <div onClick={pressComponent} className={classname}>
        <div style={style}>{arrangeComponent(movableSettings.current)}</div>
      </div>
    </Draggable>
  );
}
