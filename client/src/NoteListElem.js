import React from 'react';
import "./NoteListElem.css";

export default function NoteListElem(props) {

    let style = "NoteListElem";
    console.log(props.name)
    if(props.name == "collectionbutton"){
        style += " collectionbutton";
    }

    return (
        <div className={style}>
            {props.children}
        </div>
    )
}
