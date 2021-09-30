import React from 'react';
import "./NoteList.css";
import NoteListElem from "./NoteListElem";



export default function NoteList(props) {
    
    
    console.log(props.listofNotes);
    
    function onNavItemClick(endpoint){

        props.sendGetRequestToAppLayer(endpoint);
    }


    const navItemList = props.listofNotes.map((curr) => <NoteListElem clickEvent={onNavItemClick} key={Math.random()} itemID={curr[1]}>{curr[0]}</NoteListElem>);
  
    
    return (
        <div className="NoteList">
            
         
            {navItemList}
           
         

        </div>
    )
}
