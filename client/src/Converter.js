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
            <div>
              <div className="buttonAndInput">
                <button onClick={props.onPlayButtonHandler}>
                  PLAY ALTERNATE
                </button>
                <input type="number" ref={props.animationSpeed}></input>
              </div>

              <div className="buttonAndInput">
                <button onClick={props.newFrame}>NEW FRAME</button>
                <input
                  type="number"
                  onChange={props.navigateToFrame}
                  value={props.currentFrame}
                ></input>
              </div>
            </div>

            <p>
              CARD: {props.currentCard[0]} FRAME: {props.currentFrame}
            </p>
          </div>

          <div className="middleColumn">
            <input
              id="noteNameField"
              name="nameField"
              type="text"
              ref={currentNoteName}
            ></input>

            <div>
              <div>
                <button className="saveCard" onClick={onSubmitClick}>
                  SAVE CARD
                </button>
                <button className="createCollection">CREATE COLLECTION</button>

                <button onClick={onSetShowModeHandler}>SWITCH</button>
              </div>
            </div>

            <div></div>
          </div>

          <div className="lastColumn">
            <div></div>

            <div>
              <svg
                onClick={onDeleteClick}
                id="Layer_1"
                className="trashBin"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 938 938"
              >
                <defs></defs>
                <g>
                  <path
                    className="trash"
                    d="M469,925C217.1,924.8,13,720.5,13.2,468.6A456.19,456.19,0,0,1,291.5,48.8c232.1-98,499.7,10.7,597.7,242.7S878.6,791.1,646.5,889.2A454.7,454.7,0,0,1,469,925Z"
                  />
                  <path
                    className="trash2"
                    d="M469,25.5c245,.2,443.5,199,443.3,444A443.49,443.49,0,0,1,641.6,877.7C415.9,973,155.7,867.4,60.3,641.7s10.3-485.9,236-581.3A441.94,441.94,0,0,1,469,25.5m0-25C210.2.5.5,210.2.5,469S210.2,937.5,469,937.5,937.5,727.8,937.5,469,727.8.5,469,.5Z"
                  />
                </g>
                <g>
                  <g>
                    <g>
                      <path
                        className="trash3"
                        d="M398,745.86V280.13c0-9.23,6.68-16.64,14.95-16.64h0c8.27,0,14.95,7.41,14.95,16.64V745.86c0,9.22-6.68,16.64-14.95,16.64h0C404.67,762.5,398,755.08,398,745.86Z"
                      />
                      <path
                        className="trash3"
                        d="M507.72,745.86V280.13c0-9.23,6.67-16.64,14.95-16.64h0c8.27,0,15,7.41,15,16.64V745.86c0,9.22-6.68,16.64-15,16.64h0C514.39,762.5,507.72,755.08,507.72,745.86Z"
                      />
                      <path
                        className="trash3"
                        d="M279,745.86V280.13c0-9.23,6.68-16.64,14.95-16.64h0c8.27,0,14.95,7.41,14.95,16.64V745.86c0,9.22-6.68,16.64-14.95,16.64h0C285.78,762.5,279,755.08,279,745.86Z"
                      />
                      <path
                        className="trash3"
                        d="M629.1,744.87V279.13c0-9.22,6.68-16.63,14.95-16.63h0c8.27,0,15,7.41,15,16.63V744.87c0,9.22-6.68,16.63-15,16.63h0C635.78,761.5,629.1,754,629.1,744.87Z"
                      />
                    </g>
                    <path
                      className="trash3"
                      d="M236.13,248.54H701.87c9.22,0,16.63,6.68,16.63,15h0c0,8.27-7.41,14.95-16.63,14.95H236.13c-9.22,0-16.63-6.68-16.63-14.95h0C219.5,255.22,227,248.54,236.13,248.54Z"
                    />
                    <path
                      className="trash3"
                      d="M236.13,746.55H701.87c9.22,0,16.63,6.68,16.63,15h0c0,8.27-7.41,15-16.63,15H236.13c-9.22,0-16.63-6.68-16.63-15h0C219.5,753.23,227,746.55,236.13,746.55Z"
                    />
                  </g>
                  <path
                    className="trash3 top"
                    d="M375.67,161.55H562.33c3.7,0,6.67,6.68,6.67,14.95h0c0,8.27-3,14.95-6.67,14.95H375.67c-3.7,0-6.67-6.68-6.67-14.95h0C369,168.23,372,161.55,375.67,161.55Z"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
