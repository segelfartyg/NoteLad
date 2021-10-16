import React, {useState, useEffect, useRef} from 'react';
import "./NoteLadMovable.css";
import Draggable from "react-draggable";

export default function NoteLadMovable(props) {
    
    const movableSettings = useRef([]);
    
    let style = "NoteLadMovable ";

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
                        if(component[i+3] != ">"){
                            compID = component[i+3];
                            if(component[i+4] != ">"){
                                compID = component[i+4];
                            }
                        }

                    }
                }           
            }

            if(component[i] == "p"){

                compStyle = "p"
            }

            if(component[i] + component[i+1]== "h1"){

                    compStyle = "h1";
                    style += " h1";
            }

            if(component[i] + component[i+1]== "h2"){
                compStyle = "h2";
                style += " h2";
            }
    
            if(component[i] + component[i+1]== "h3"){

                compStyle = "h3";
                style += " h3";
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
    
    console.log("MOVABLESETTINGS: " + movableSettings.current);
   

    props.sendMovableData(movableSettings.current);
  
    
    
    return (

        <Draggable>
        <div className={style}>



           {movableSettings.current[0]}




        </div>
        </Draggable>
    )
}
