import './navbar_client.css'
import profile from "../images/Test Account.png";
import home from "../images/Home.png";
import fire from "../images/Fire.png";
import {Link, Route, Router} from 'react-router-dom'
import LandingPage from './landing_page';
import DropdownNavbar from './navbar_dropdown';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from "axios";

function NavbarClient(){
    const navigate = useNavigate();
    const [streak, setStreak] = useState(0)

    function GoBack(){
        navigate("/client/dashboard")
    }
    
    useEffect(() => {
        const fetchData = async function () {
          let toSend = { email: localStorage.getItem("email") };
          let result2 = await axios.post(
            "http://localhost:4000/client/getStreak",
            toSend
          );
          setStreak(result2.data.streak)
        };
        fetchData();
      }, []);

    return(
        <nav>
            <ul className='nav-items-list'>
                <li className='guftaar-logo nav-item'><a onClick={GoBack}>Guftaar</a></li>
                <li className='nav-item'> <a className='nav-anchor' href= '/client/dailyActivities'>daily activities</a></li>
                <li className='nav-item'> <a className='nav-anchor' href='/client/SpeechTechniques'>speech techniques</a></li>
                <li className='nav-item'><a className='nav-anchor' href='/client/QuickPractice'>quick practice</a></li>
                <li className='nav-item'><a className='nav-anchor' href='/client/viewCoaches'>coaches</a></li>
                <li className='nav-item'><a className='nav-anchor' href='/client/courses'>courses</a></li>
                <div>
                    <img src={fire} className='navbar-img-fire'/>
                    <span className='streak-value'>{streak}</span>
                </div>

                <div className='navbar-icons'>    
               <img src={home} className='navbar-img-home' onClick={GoBack}/>
                </div>

                <DropdownNavbar/>
                
            </ul>
        </nav>
    )
}

export default NavbarClient; 