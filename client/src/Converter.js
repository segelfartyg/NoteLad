import React, {useRef} from 'react';
import "./Converter.css";

export default function Converter(props) {
    

    const currentDesc = useRef("");
    const currentNoteName = useRef("");

    function onSubmitClick(){

        props.onSave(currentNoteName.current.value, currentDesc.current.value);
    }


    function onDeleteClick(){
      props.onDelete();
  }
    
    
    function onSetShowModeHandler(){

      props.onSetShowMode(true);
    }
    
    return (
        <div>

<div className={props.converterStyle}>

<div className="converterForm">

<div className="firstColumn">


  <button onClick={onSetShowModeHandler}>SWITCH TO SHOWMODE</button>
  {/* <div>


  <svg className="baseCard" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 145 245">
  <defs>
    <style>
     
    </style>
  </defs>
  <rect class="cls-111" x="2.5" y="2.5" width="140" height="240" rx="9.95"/>
</svg>


<svg className="baseCard" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 145 245">
  <defs>
    <style>
     
    </style>
  </defs>
  <rect class="cls-112" x="2.5" y="2.5" width="140" height="240" rx="9.95"/>
</svg>



  </div>


<div>

<input type="color"></input>
<input className="backsideText" type="text" placeholder="Backside text"></input>


</div> */}

</div>

<div className="middleColumn">

  
<div className="cardNameField">
 <label id="nameField" htmlFor="nameField">CARD NAME:</label>
 <input id="noteNameField" name="nameField" type="text" ref={currentNoteName}></input>

 {/* <div className="inputField">
 <label for="descField">DESCRIPTION:</label>
 <input id="noteDescField" name="descField" type="text" ref={currentDesc}></input>
 </div> */}




</div>


<div>





</div>





 </div>

<div className="lastColumn">
<div>

  
</div>


<div>
<button className="saveCard" onClick={onSubmitClick}>SAVE CARD</button>
<button className="createCollection">CREATE COLLECTION</button>
</div>

<svg onClick={onDeleteClick} id="Layer_1" className="trashBin" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 938 938">
  <defs>
    <style>
  
    </style>
  </defs>
  <g>
    <path className="trash" d="M469,925C217.1,924.8,13,720.5,13.2,468.6A456.19,456.19,0,0,1,291.5,48.8c232.1-98,499.7,10.7,597.7,242.7S878.6,791.1,646.5,889.2A454.7,454.7,0,0,1,469,925Z"/>
    <path className="trash2" d="M469,25.5c245,.2,443.5,199,443.3,444A443.49,443.49,0,0,1,641.6,877.7C415.9,973,155.7,867.4,60.3,641.7s10.3-485.9,236-581.3A441.94,441.94,0,0,1,469,25.5m0-25C210.2.5.5,210.2.5,469S210.2,937.5,469,937.5,937.5,727.8,937.5,469,727.8.5,469,.5Z"/>
  </g>
  <g>
    <g>
      <g>
        <path className="trash3" d="M398,745.86V280.13c0-9.23,6.68-16.64,14.95-16.64h0c8.27,0,14.95,7.41,14.95,16.64V745.86c0,9.22-6.68,16.64-14.95,16.64h0C404.67,762.5,398,755.08,398,745.86Z"/>
        <path className="trash3" d="M507.72,745.86V280.13c0-9.23,6.67-16.64,14.95-16.64h0c8.27,0,15,7.41,15,16.64V745.86c0,9.22-6.68,16.64-15,16.64h0C514.39,762.5,507.72,755.08,507.72,745.86Z"/>
        <path className="trash3" d="M279,745.86V280.13c0-9.23,6.68-16.64,14.95-16.64h0c8.27,0,14.95,7.41,14.95,16.64V745.86c0,9.22-6.68,16.64-14.95,16.64h0C285.78,762.5,279,755.08,279,745.86Z"/>
        <path className="trash3" d="M629.1,744.87V279.13c0-9.22,6.68-16.63,14.95-16.63h0c8.27,0,15,7.41,15,16.63V744.87c0,9.22-6.68,16.63-15,16.63h0C635.78,761.5,629.1,754,629.1,744.87Z"/>
      </g>
      <path className="trash3" d="M236.13,248.54H701.87c9.22,0,16.63,6.68,16.63,15h0c0,8.27-7.41,14.95-16.63,14.95H236.13c-9.22,0-16.63-6.68-16.63-14.95h0C219.5,255.22,227,248.54,236.13,248.54Z"/>
      <path className="trash3" d="M236.13,746.55H701.87c9.22,0,16.63,6.68,16.63,15h0c0,8.27-7.41,15-16.63,15H236.13c-9.22,0-16.63-6.68-16.63-15h0C219.5,753.23,227,746.55,236.13,746.55Z"/>
    </g>
    <path className="trash3 top" d="M375.67,161.55H562.33c3.7,0,6.67,6.68,6.67,14.95h0c0,8.27-3,14.95-6.67,14.95H375.67c-3.7,0-6.67-6.68-6.67-14.95h0C369,168.23,372,161.55,375.67,161.55Z"/>
  </g>
</svg>

</div>
 
 

</div>
 
 
{/* <div className="inputField">
 <button>NOTIFY</button>
 </div> */}



 {/* <svg className="trashBin" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 938 938">
  <defs>
  
  </defs>
  <g>
    <path class="cls-11" d="M469,925C217.09,924.84,13,720.5,13.16,468.6A456.14,456.14,0,0,1,291.5,48.83C523.56-49.2,791.15,59.5,889.18,291.5S878.56,791.14,646.5,889.17A452.83,452.83,0,0,1,469,925Z"/>
    <path class="cls-22" d="M469,25.5c245,.18,443.48,199,443.3,444A443.63,443.63,0,0,1,641.62,877.7C415.92,973,155.68,867.36,60.34,641.7s10.34-485.94,236-581.28A440.69,440.69,0,0,1,469,25.5m0-25C210.25.5.5,210.25.5,469S210.25,937.5,469,937.5,937.5,727.75,937.5,469,727.75.5,469,.5Z"/>
  </g>
  <g>
    <path class="cls-33" d="M726.6,484H211.4c-10.16,0-18.4-6.72-18.4-15h0c0-8.28,8.24-15,18.4-15H726.6c10.16,0,18.4,6.72,18.4,15h0C745,477.28,736.76,484,726.6,484Z"/>
    <path class="cls-33" d="M679,384H259a15,15,0,0,1-15-15h0a15,15,0,0,1,15-15H679a15,15,0,0,1,15,15h0A15,15,0,0,1,679,384Z"/>
    <path class="cls-33" d="M669,584H249a15,15,0,0,1-15-15h0a15,15,0,0,1,15-15H669a15,15,0,0,1,15,15h0A15,15,0,0,1,669,584Z"/>
  </g>
</svg> */}




</div>
            
        </div>
    )
}
