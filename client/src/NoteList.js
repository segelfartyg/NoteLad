import React from 'react';
import "./NoteList.css";
import NoteListElem from "./NoteListElem";



export default function NoteList(props) {
    
    
    console.log(props.listofNotes);
    
    
    
    return (
        <div className="NoteList">
            
            {props.listofNotes.map((curr) => <NoteListElem key={Math.random()}>{curr}</NoteListElem>)}
            <NoteListElem key="collectionbutton" name="collectionbutton">collection</NoteListElem>
         


        </div>
    )
}
