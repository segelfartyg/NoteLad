import React, { useState } from 'react'
import logo from './noteladlogo1.svg';
import "./NavBar.css";
import NoteList from "./NoteList.js";


export default function NavBar(props) {

    const [ noteList, setnoteList] = useState([ ["Animals", "111"], ["History", "222"], ["English", "255"], ["Swedish", "355"]]);



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
               




        
        </div>
    )
}
