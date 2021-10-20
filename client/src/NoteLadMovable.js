import React, {useState, useEffect, useRef} from 'react';
import "./NoteLadMovable.css";
import Draggable from "react-draggable";

export default function NoteLadMovable(props) {
    
    const movableSettings = useRef([]);
    
    var trans =  'rotate(110deg)';

    const [degrees, setDegrees] = useState(0);

    const style = {
        transform: "rotate(" + degrees + "deg)",
    }
    

    let classname = "NoteLadMovable ";



    function componentFiltering(component){
 
        let count = 0;
        let temp = "";
        let addToContent = false;
        let compID = "";
        let compStyle = "";
        let foundID = false;

        for (let i = 0; i < component.length; i++) {
          if (component[i] == "<") {
            addToContent = false;    
        }

        if(!addToContent){
            if(component[i] == "i" && !foundID){
                
                if(component[i + 1] == "d"){
                    if(component[i+2] == "="){
                       compID = component[i+3] + component[i+4] + component[i+5] + component[i+6] + component[i+7];

                    }
                }           
            }

            if(component[i] == "p"){

                compStyle = "p"
            }

            if(component[i] + component[i+1]== "h1"){

                    compStyle = "h1";
                    classname += " h1";
            }

            if(component[i] + component[i+1]== "h2"){
                compStyle = "h2";
                classname += " h2";
            }
    
            if(component[i] + component[i+1]== "h3"){

                compStyle = "h3";
                classname += " h3";
            }
        }

        if(component[i] == ">"){


            foundID = true;
            addToContent = true;
        }
             
        else if(addToContent && foundID){

            if(component[i] + component[i+1] + component[i+2] == "&lt"){
                temp += "<";
                count = 4;
            }

            if(component[i] + component[i+1] + component[i+2] == "&gt"){
                temp += ">";
                count = 4;
            }
   
          if(count == 0){
                temp += component[i];  
                
            }
            else{
                count--;  
            } 
        }   
    }


    return [temp, compID, compStyle];
}

   
    
    // const noteLadContent = componentFiltering(props.componentData);

    movableSettings.current = componentFiltering(props.componentData);
    
 
   

    props.sendMovableData(movableSettings.current);

    const[controlledPosition, setControlledPosition] = useState({x: 200, y: 200});


    function adjustXPos(e){
        e.preventDefault();
        e.stopPropagation();
        const {x, y} = controlledPosition();
        setControlledPosition({x: x - 10, y});
      };

      function adjustYPos(e){
        e.preventDefault();
        e.stopPropagation();
        const {x, y} = controlledPosition;
        setControlledPosition({x, y: y - 10});
      };

      function onControlledDrag(e, position){
        const {x, y} = position;
        setControlledPosition({x, y})
      };


      console.log(controlledPosition);
  
    
      function pressComponent(data){

        props.clickHandlerChooseComp(movableSettings.current[1], controlledPosition.x, controlledPosition.y, degrees);
      }


      useEffect(() => {
        if(props.chosenComp == movableSettings.current[1]){
            console.log(props.chosenComp);
            console.log(movableSettings.current);
            console.log(props.currentAngle);
            setDegrees(props.currentAngle);
        }
    }, [props.currentAngle])
    
    useEffect(() => {
        if(props.chosenComp == movableSettings.current[1]){
            console.log(props.chosenComp);
            console.log(movableSettings.current);
            const {x, y} = controlledPosition;
            setControlledPosition({x, y: props.currentY});
        }
    }, [props.currentY])

    useEffect(() => {
        if(props.chosenComp == movableSettings.current[1]){
            console.log(props.chosenComp);
            console.log(movableSettings.current);
            const {x, y} = controlledPosition;
            setControlledPosition({x: props.currentX, y});
        }
    }, [props.currentX])
    return (

        <Draggable bounds="parent" position={controlledPosition} onDrag={onControlledDrag} >

        <div onClick={pressComponent} className={classname}>

        <div style={style}>

           {movableSettings.current[0]}

           </div>


        </div>
        </Draggable>
    )
}
