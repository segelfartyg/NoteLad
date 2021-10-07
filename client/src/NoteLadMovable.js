import React, {useState, useEffect, useRef} from 'react';
import "./NoteLadMovable.css";
import Draggable from "react-draggable";

export default function NoteLadMovable(props) {
    
    const movableSettings = useRef([]);
    
    let style = "NoteLadMovable ";

    console.log("FRÅN MOVABLE: " + props.componentData)
    
    function componentFiltering(component){

      
      
        let counted = 0;
        let temp = "";
        let addToContent = false;
        let compID = "";
        let compStyle = "";

        for (let i = 0; i < component.length; i++) {
          if (component[i] == "<") {
           
            addToContent = false;

            
          
        }

        if(!addToContent){

            if(component[i] == "i"){
                if(component[i + 1] == "d"){
                    if(component[i+2] == "="){
                        if(component[i+3] != ">"){
                            compID += component[i+3];
                            if(component[i+4] != ">"){
                                compID += component[i+4];
                            }
                        }

                    }
                }
            }

            if(component[i] == "p"){

                compStyle = "p"
            }

            if(component[i] + component[i+1]== "h1"){

                    compStyle = "h1"
            }

            if(component[i] + component[i+1]== "h2"){
                compStyle = "h2"

            }

            
            if(component[i] + component[i+1]== "h3"){

                compStyle = "h3"
            }

        }

        if(component[i] == ">"){
            addToContent = true;
        }
        
        
        
        else if(addToContent){
            temp += component[i];     
        }
        
       
    }

    console.log(compID);
    console.log(compStyle);
    return [temp, compID, compStyle];
}

    
    
    // const noteLadContent = componentFiltering(props.componentData);

    movableSettings.current = componentFiltering(props.componentData);
    
    console.log(movableSettings.current);
   
  
    
    
    return (

        <Draggable>
        <div className={style}>



           {movableSettings.current[0]}




        </div>
        </Draggable>
    )
}
