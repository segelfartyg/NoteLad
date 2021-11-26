import React from "react";
import "./NoteList.css";
import NoteListElem from "./NoteListElem";

export default function NoteList(props) {

    // SENDS GET REQUEST TO SPECIFIC ENDPOINT
  function onNavItemClick(endpoint) {
    props.sendGetRequestToAppLayer(endpoint);
  }

  // FILLS THE navItemList WITH ITEMS FROM THE listofNotes VARIABLE
  const navItemList = props.listofNotes.map((curr) => (
    <NoteListElem clickEvent={onNavItemClick} itemID={curr[1]} key={curr[1]}>
      {curr[0]}
    </NoteListElem>
  ));

  return <div className="NoteList">{navItemList}</div>;
}
