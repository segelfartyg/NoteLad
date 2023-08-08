import React, { useRef } from "react";
import "./Converter.css";

export default function Converter(props) {

  // DESCRIPTION OF THE CURRENT NOTE
  const currentDesc = useRef("");

  // NAME OF THE CURRENT NOTE
  const currentNoteName = useRef("");

  // STYLE CHANGED BY THE THEME
  const converterThemeStyle = {
    background: props.theme.converterColor,
  };

  // FUNCTION FOR SENDING THE NOTE TO DATABASE
  function onSubmitClick() {
    props.onSave(currentNoteName.current.value, currentDesc.current.value);
  }

  
  // FUNCTION FOR DELETING THE NOTE FROM DATABASE
  function onDeleteClick() {
    props.onDelete();
  }

  // HANDLER FOR SETTING THE SHOWMODE ON
  function onSetShowModeHandler() {
    props.onSetShowMode(true);
  }

  return (
    <div>
      <div className={props.converterStyle} style={converterThemeStyle}>
        <div className="converterForm">
          <div className="firstColumn">
      
              <div className="singleButton">
                <button className="svgButton" onClick={props.onPlayButtonHandler}>
                <svg id="playSvg" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 938 938">
  <defs>
  </defs>
  <g>
    <path class="cls-1" d="M469,925C217.1,924.8,13,720.5,13.2,468.6A456.19,456.19,0,0,1,291.5,48.8c232.1-98,499.7,10.7,597.7,242.7S878.6,791.1,646.5,889.2A454.7,454.7,0,0,1,469,925Z"/>
    <path class="cls-2" d="M469,25.5c245,.2,443.5,199,443.3,444A443.5,443.5,0,0,1,641.6,877.7C415.9,973,155.7,867.4,60.3,641.7s10.3-485.9,236-581.3A441.8,441.8,0,0,1,469,25.5m0-25C210.2.5.5,210.2.5,469S210.2,937.5,469,937.5,937.5,727.8,937.5,469,727.8.5,469,.5Z"/>
  </g>
  <g>
    <path class="cls-3" d="M306.66,652.54l3.21-361.47c.06-7.15,5.3-12.86,11.75-12.8s11.56,5.86,11.49,13L329.9,652.75c-.06,7.16-5.3,12.86-11.72,12.8S306.59,659.63,306.66,652.54Z"/>
    <path class="cls-3" d="M314.35,643.76,629,465.81c6.22-3.53,13.78-1.84,17,3.78h0c3.16,5.58.73,13-5.5,16.49L325.81,664c-6.23,3.52-13.78,1.84-17-3.78h0C305.67,654.63,308.18,647.25,314.35,643.76Z"/>
    <path class="cls-3" d="M624.74,483,316.55,294.06c-6.1-3.74-8.29-11.17-4.92-16.67h0c3.36-5.47,11-6.92,17.09-3.18L636.91,463.13c6.1,3.74,8.29,11.16,4.92,16.67h0C638.45,485.3,630.78,486.68,624.74,483Z"/>
  </g>
</svg>

                </button>
                </div>
                <div className="textAndInput">
                <p>ANIMATION SPEED</p>
                <input type="number" ref={props.animationSpeed}></input>
               

                </div>
              
         
         
              <div className="textAndInput">
              <p>
            CURRENT FRAME
            </p>
              <input
                  type="number"
                  onChange={props.navigateToFrame}
                  value={props.currentFrame}
                ></input>
                

                  
              </div>
             
        
         
           
            <div className="twoButtons">
            <button onClick={onSetShowModeHandler}>SWITCH MODE</button>
            <button onClick={props.newFrame}>ADD FRAME</button>
            </div>
            
          </div>

       

         
          </div>
        </div>
      </div>
 
  );
}
