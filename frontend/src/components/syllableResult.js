import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./syllable.css"
import NavbarClient from "./client_navbar";
import cross from "../images/cross.svg";
import ProgressBar from "@ramonak/react-progress-bar";
import {Checkmark} from "react-checkmark"
import axios from "axios"



const SyllableCountingResult = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const markedAns = location.state.markedAns;
    const score = markedAns.filter((item) => item == true).length;

    function syllableDone(){
      navigate("../")
      const toSend = { email: localStorage.getItem("email"), syllableCounting: true };
    axios
      .post("http://localhost:4000/client/updateSyllableCounting", toSend)
      .then((res) => {
        if (res.data.status === 200) {
          console.log("Updated Syllable Counting");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }

      
    if (!localStorage.getItem("token")){
      return (
        <div>
          <h1> Not Authorized</h1>
        </div>
      )
    }
    else{
    return (
        <div className="activity-bg"> 
        <NavbarClient/>
        <div className="topbar">
        <div className="status"> 3 of 3</div>
        <h3 className="titleL">Syllable Counting Activity</h3>
        <a href="./">
          <img className="gobackcross" src={cross} />
        </a>
        </div>
    <div className="anim">
      <div id="resBox" >
    <h1 className="res" > All Done </h1>
    <Checkmark id="checkmark" color="#726CF8" size="180px"/>
    <h3 id="sc"> You got {score} out of 3 correct!</h3>
    <button className='buttonRes' onClick={() => {syllableDone()}}>Go to Activities</button>
        </div>
        </div>
        </div>
    );



}
}
export default SyllableCountingResult;