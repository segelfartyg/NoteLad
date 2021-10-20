import React, {useState, useRef, useEffect} from "react";
import Draggable from "react-draggable";
import "./Mirror.css";
import NoteLadMovable from "./NoteLadMovable";


export default function Mirror(props) {



  const[chosenComp, setChosenComp] = useState();
  const[currentX, setCurrentX] = useState();
  const[currentY, setCurrentY] = useState();
  const[currentAngle, setCurrentAngle] = useState();
 
  
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


    const components = props.components.map((component) => 
    <NoteLadMovable key={Math.random} chosenComp={chosenComp} currentX={currentX} currentAngle={currentAngle} currentY={currentY} sendMovableData={sendMovableData} clickHandlerChooseComp={clickHandlerChooseComp} componentData={component}>{}</NoteLadMovable>);




// const [currentAngle, setCurrentAngle] = useState();


useEffect(() => {

  
}, [chosenComp])


useEffect(() => {


  
}, [currentX])

function clickHandlerChooseComp(_chosenComp, x, y, angle){

setChosenComp(_chosenComp);
setCurrentX(x);
setCurrentY(y);
setCurrentAngle(angle);
console.log(x, y);
console.log(chosenComp);
}


  return (

    <div className={props.mirrorStyle}>
      <div className={props.topBarStyle}>

        <div className="firstColTool">
      
        </div>

        <div className="secondColTool">

        <input type="number" placeholder="angle" value={currentAngle} onChange={e => setCurrentAngle(e.target.value)}></input>
        
        <input type="number" placeholder="width" value={currentX} onChange={e => setCurrentX(e.target.value)}></input>
        
        <input type="number" placeholder="height" value={currentY} onChange={e => setCurrentY(e.target.value)}></input>

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
