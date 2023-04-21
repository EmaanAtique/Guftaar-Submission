import React, { useState } from "react";

import plusIcon from "../images/plus.png";

import "./sidebar.css";

function Sidebar(props) {
  return (
    <div className="sidebar">
      <div className="left-sidebar-img">
        <div>
          <img
            id="note-img"
            src={plusIcon}
            alt="Add"
            onClick={() => props.addNote("#8b90c5")}
          />
        </div>
      </div>
      <div className="right-sidebar-img">
        <h2 id="note-head"> Notes</h2>
      </div>
    </div>
  );
}

export default Sidebar;
