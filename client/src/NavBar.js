import React, { useState } from 'react'
import logo from './noteladlogo1.svg';
import "./NavBar.css";
import NoteList from "./NoteList.js";


export default function NavBar() {

    const [ noteList, setnoteList] = useState(["Animals", "History", "English", "Swedish"]);


    return (
        <div className="navbar">



                <div className="logotitle">


            
                {/*<h1>Notelad</h1>*/}
                <img className="headerlogo" src={logo} alt="logo"/>  

                </div>
               
               <NoteList listofNotes={noteList}></NoteList>
               




        
        </div>
    )
}
