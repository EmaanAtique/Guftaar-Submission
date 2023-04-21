import './set_breathing_time.css'
import cross from "../images/cross.svg";
import DailyActivities from "./daily_activities";
import timer from "../images/setTime.svg";
import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/primereact.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/mdc-light-deeppurple/theme.css';
import NavbarClient from './client_navbar';
import { useNavigate } from 'react-router-dom';



function SetBreathingTime() {

    const [selectedOption, setSelectedOption] = useState(null);

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    }
    const opt = [
        { name: '1 minute'},
        { name: "2 minutes" },
        { name: "3 minutes" }
        ];

    const navigate = useNavigate();

    function next(){
        if (!selectedOption){
            document.getElementById("error-text-time").textContent = "Please pick an option!"
            return
        }
        else{
            document.getElementById("error-text-time").textContent = ""
        }
        if (selectedOption.name === "1 minute"){
            const state = {rounds: 9}
            navigate("../BreathingExercise", { state })
        }
        else if (selectedOption.name === "2 minutes"){
            const state = {rounds: 18}
            navigate("../BreathingExercise", { state })
        }
        else if (selectedOption.name === "3 minutes"){
            const state = {rounds: 27}
            navigate("../BreathingExercise", { state })
        }


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
        <div className='breathingBackGround'>
             <NavbarClient />
           <h3 className='titlequestion'>Breathing Exercise</h3>  
           <a href='./'><img className="gobackcross"src={cross}/></a>
           <h1 className='whichquestion'>Select the time duration for this activity</h1>
           <div className='timerBack'>
           <img className='clockpic' src={timer}/>

           <Dropdown value={selectedOption} onChange={handleSelectChange} options={opt} optionLabel="name" 
                placeholder="Select Time Duration"  className='dropd'/>
            <button className="gbtn" onClick={next}> I'm ready </button>
            <span id="error-text-time"></span>
           </div>
        </div>
    );
}
}

export default SetBreathingTime