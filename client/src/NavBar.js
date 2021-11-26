import React, { useState } from "react";
import logo from "./noteladlogo1.svg";
import "./NavBar.css";
import NoteList from "./NoteList.js";
import NoteLadPlus from "./noteladplus.svg";

export default function NavBar(props) {
  const style = {
    background:
      "linear-gradient(" +
      props.theme.navBarGradientAngle +
      "deg, " +
      props.theme.navbarColor1 +
      " 0%, " +
      props.theme.navbarColor2 +
      " 50%, " +
      props.theme.navbarColor3 +
      " 100%)",
  };

  function sendGetRequestToAppLayer(endpoint) {
    props.sendGetRequest(endpoint);
  }

  return (
    <div style={style} className="navbar">
      <div className="logotitle">
        {/*<h1>Notelad</h1>*/}
        <svg
          className="headerlogo"
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 937 937"
        >
          <defs>
            <linearGradient id="grad1" x1="0%" y1="00%" x2="10%" y2="100%">
              <stop offset="0%" stop-color={props.theme.logoColor1} />
              <stop offset="50%" stop-color={props.theme.logoColor2} />
              <stop offset="100%" stop-color={props.theme.logoColor3} />
            </linearGradient>
          </defs>
          <g>
            <path
              className="cls-1555"
              d="M500,956A456.12,456.12,0,0,1,322.51,79.83a456.12,456.12,0,0,1,355,840.34A453,453,0,0,1,500,956Z"
              transform="translate(-31.5 -31.5)"
            />
            <path
              d="M500,56.5A443.63,443.63,0,0,1,672.62,908.66,443.62,443.62,0,0,1,327.38,91.34,440.69,440.69,0,0,1,500,56.5m0-25C241.25,31.5,31.5,241.25,31.5,500S241.25,968.5,500,968.5,968.5,758.75,968.5,500,758.75,31.5,500,31.5Z"
              transform="translate(-31.5 -31.5)"
            />
          </g>
          <g>
            <path
              d="M295.25,500.66h49.21V234.55l59.61,84.33V560.26H354.85Zm51.44-346.24L452.54,214l82.6,116.73v90.52ZM532.18,500.66h51.93V154.42l59.6,59.6V560.26H591.78Z"
              transform="translate(-31.5 -31.5)"
            />
            <path
              d="M424.79,786H645.15V738l59.6,59.6v48H484.4Zm50.7-346.24,59.61,59.6V738H475.49Z"
              transform="translate(-31.5 -31.5)"
            />
          </g>
        </svg>
      </div>

      <NoteList
        sendGetRequestToAppLayer={sendGetRequestToAppLayer}
        listofNotes={props.noteList}
      ></NoteList>

      <div className="addNewNoteArea">
        <img
          className="addNoteNavBar"
          onClick={props.newNote}
          src={NoteLadPlus}
          alt="addNote"
        ></img>
      </div>
    </div>
  );
}
