import React from 'react';
import "./NoteListElem.css";

export default function NoteListElem(props) {

    let style = "NoteListElem";
    console.log(props);
    if(props.name == "collectionbutton"){
        style += " collectionbutton";
    }

    function onClickHandler(){

        props.clickEvent(props.itemID);
    }

    return (
        <div onClick={onClickHandler} className={style}>
            {props.children}
        </div>
    )
}
