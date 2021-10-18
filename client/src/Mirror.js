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

    function sendMovableData(data){


      props.sendMovableDataFromMirror(data);
    }


    const components = props.components.map((component) => <NoteLadMovable key={Math.random} sendMovableData={sendMovableData} componentData={component}>{}</NoteLadMovable>);







  return (

    <div className={props.mirrorStyle}>
      <div className={props.topBarStyle}>

        <div className="firstColTool">
      
        </div>

        <div className="secondColTool">

        <input type="number" placeholder="angle"></input>
        
        <input type="number" placeholder="width"></input>
        
        <input type="number" placeholder="height"></input>

        </div>

      </div>
    <div className={style}>
    

  

      <div className="mirrorMainArea">

                {/* <Draggable>
                <div className="NoteLadMovable">
                </div>
                </Draggable> */}
                    {components}

               
    


      </div>

    



    </div>

</div>
  );
}
