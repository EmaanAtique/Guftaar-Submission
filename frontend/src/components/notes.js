// import { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import NavbarClient from "./client_navbar";
// import Note from "./note"
// import "./notes.css"
// import Sidebar from "./sidebar"

// const Notes = () => {
//     return(
//         <div className="note-container">
//                 <h2> Notes</h2>
//                 <div className="note-container-notes">
//                 <Note note={{
//                 text:"hi",
//                 time:"12:00",
//                 color:"offwhite"
//             }}/>
//             <Note note={{
//                 text:"hi",
//                 time:"12:00",
//                 color:"offwhite"
//             }}/>
//             <Note note={{
//                 text:"hi",
//                 time:"12:00",
//                 color:"offwhite"
//             }}/>
//             <Note note={{
//                 text:"hi",
//                 time:"12:00",
//                 color:"offwhite"
//             }}/>
//             <Note note={{
//                 text:"hi",
//                 time:"12:00",
//                 color:"offwhite"
//             }}/>
//             <Note note={{
//                 text:"hi",
//                 time:"12:00",
//                 color:"offwhite"
//             }}/>
//             <Note note={{
//                 text:"hi",
//                 time:"12:00",
//                 color:"offwhite"
//             }}/>
//                     </div>
//                     </div>
//     )
// }

// export default Notes;

import React from "react";

import Note from "../components/note";

import "./NoteContainer.css";

function NoteContainer(props) {
  const reverArray = (arr) => {
    const array = [];

    for (let i = arr.length - 1; i >= 0; --i) {
      array.push(arr[i]);
    }

    return array;
  };

  const notes = reverArray(props.notes);
  if (!localStorage.getItem("token")){
    return (
      <div>
        <h1> Not Authorized</h1>
      </div>
    )
  }
  else{
  return (
    <div className="note-container">
        <div>
            <p></p>
      <div className="note-container_notes custom-scroll">
        {notes?.length > 0 ? (
          notes.map((item) => (
            <Note
              key={item.id}
              note={item}
              deleteNote={props.deleteNote}
              updateText={props.updateText}
            />
          ))
        ) : (
          <h3 id="nonep">No Notes present</h3>
        )}
        </div>
      </div>
    </div>
  );
}
}

export default NoteContainer;