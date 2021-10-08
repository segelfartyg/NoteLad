import React from "react";
import Draggable from "react-draggable";
import "./Mirror.css";
import NoteLadMovable from "./NoteLadMovable";


export default function Mirror(props) {


    let style = "mirrorArea ";


    if(props.showMode){
        style += "show";
    }
    else{
        style = "mirrorArea ";
    }

    


    const components = props.components.map((component) => <NoteLadMovable componentData={component}>{}</NoteLadMovable>);







  return (
    <div className={style}>


      <div className="leftArea"></div>

      <div className="mirrorMainArea">

                {/* <Draggable>
                <div className="NoteLadMovable">
                </div>
                </Draggable> */}
                    {components}

               
    


      </div>

      <div className="rightArea"></div>



    </div>
  );
}
