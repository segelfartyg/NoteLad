import React, { useState } from 'react'
import logo from './noteladlogo1.svg';
import "./NavBar.css";
import NoteList from "./NoteList.js";
import NoteLadPlus from "./noteladplus.svg";


export default function NavBar(props) {

    const [ noteList, setnoteList] = useState([ ["Animals", "1"], ["History", "2"], ["English", "3"], ["Swedish", "4"]]);



    function sendGetRequestToAppLayer(endpoint){


        props.sendGetRequest(endpoint);
    }


    return (
        <div className="navbar">



                <div className="logotitle">


            
                {/*<h1>Notelad</h1>*/}
                <img className="headerlogo" src={logo} alt="logo"/>  

                </div>
               
               <NoteList sendGetRequestToAppLayer={sendGetRequestToAppLayer} listofNotes={noteList}></NoteList>
               

               <div className="addNewNoteArea">
               <img className="addNoteNavBar" src={NoteLadPlus} alt="addNote"></img>

               </div>
               



        
        </div>
    )
}
