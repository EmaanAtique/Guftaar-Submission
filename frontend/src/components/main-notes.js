// import { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import NavbarClient from "./client_navbar";
// import Note from "./note"
// import "./notes.css"
// import Sidebar from "./sidebar"
// import Notes from "./notes"
// import plus from "../images/plus.png"

// const MNotes = () => {
//     return(
//         <div className="client-bg">
//             <NavbarClient/>
//             <div className="notesA">
//                 <Notes/>
                
//             </div>
            
//             </div>
//     )
// }

// export default MNotes;

import React, { useEffect, useState } from "react";

import NoteContainer from "../components/notes";

import "./MNotes.css";
import Sidebar from "../components/sidebar";
import NavbarClient from "./client_navbar";
import NavbarCoach from "./coach_navbar";

function MNotes() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes-MNotes")) || []
  );

  const addNote = (color) => {
    const tempNotes = [...notes];

    tempNotes.push({
      id: Date.now() + "" + Math.floor(Math.random() * 78),
      text: "",
      time: Date.now(),
      color,
    });
    setNotes(tempNotes);
  };

  const deleteNote = (id) => {
    const tempNotes = [...notes];

    const index = tempNotes.findIndex((item) => item.id === id);
    if (index < 0) return;

    tempNotes.splice(index, 1);
    setNotes(tempNotes);
  };

  const updateText = (text, id) => {
    const tempNotes = [...notes];

    const index = tempNotes.findIndex((item) => item.id === id);
    if (index < 0) return;

    tempNotes[index].text = text;
    setNotes(tempNotes);
  };

  useEffect(() => {
    localStorage.setItem("notes-MNotes", JSON.stringify(notes));
  }, [notes]);
  if (!localStorage.getItem("token")){
    return (
      <div>
        <h1> Not Authorized</h1>
      </div>
    )
  }
  else{
  return (
    <div id="fixPos">
    <NavbarCoach/>
    <div className="MNotes">
      <Sidebar addNote={addNote} />
      <NoteContainer
        notes={notes}
        deleteNote={deleteNote}
        updateText={updateText}
      />
    </div>
    </div>
  );
}
}

export default MNotes;