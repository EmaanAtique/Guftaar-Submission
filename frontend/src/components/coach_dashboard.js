import React from 'react';
import "./coach_dashboard.css";
import phonei from "../images/phoneicon.png"
import infoi from "../images/infoicon.png"
import NavbarCoach from './coach_navbar';
import Carousel from './coach_dashboard_carousel';
import Calendar from './calendar'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Dashboard() {
  const [name, setName] = useState("");
  const [meetingDetails, setMeetingDetails] = useState([]);
  const [display, setDisplay] = useState(false);
  // const email = localStorage.getItem("email")
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async function () {
      let toSend = { email: localStorage.getItem("email") };
      let result2 = await axios.post(
        "http://localhost:4000/coach/getName",
        toSend
      );
      setName(result2.data.firstName)
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async function () {
      let toSend = { email: localStorage.getItem("email") };
      let result2 = await axios.post(
        "http://localhost:4000/coach/getMeetings",
        toSend
      );
      if (result2.data.length === 0) {
        alert("No meetings found.");
      } else {
        let meetingDetailsArray = result2.data;
        setMeetingDetails(meetingDetailsArray);
        setDisplay(true);
      } 
    };
    fetchData();
  }, []);

  if (!localStorage.getItem("token")){
    return (
      <div>
        <h1> Not Authorized</h1>
      </div>
    )
  }
  else{

  return (
    <div className="admin-dashboard-bg">
       <NavbarCoach />
       <div className='welcome-heading'>
        Welcome, {name}
       </div>
       <div className='second-heading'>
        Upcoming Meetings
       </div>
       <div className='meetingbox1'>
       {display && meetingDetails.length > 0 ? (
        <div>
          <h6 className='subtext'>Coaching with {meetingDetails['0'].clientName}</h6>
        </div>
      ) : (
        <h6 className='subtext'>No Upcoming Meetings</h6>
      )}
        <img src={phonei} alt="PhoneIcon" className='phoneicon1' />
        <p className='meetingstext1'> meetings</p>
       </div>
       <div className='meetingbox2'>
       {display && meetingDetails.length > 0 ? (
        <div>
          <h6 className='subtext'>Coaching with {meetingDetails['1'].clientName}</h6>
        </div>
      ) : (
        <h6 className='subtext'>No Upcoming Meetings</h6>
      )}
        <img src={phonei} alt="PhoneIcon" className='phoneicon2' />
        <p className='meetingstext2'> meetings</p>
       
       </div>
       <div className='third-heading'>
       Your Clients
       <button type="button" className='infoicon'>
       <img src={infoi} alt="InfoIcon" className='infoicon' />
        </button>
       </div>
       <div className='meetingscroll'>
        <button className='addnotesbutton' onClick={() => {navigate("/coach/notes")}}>+ add notes</button> 
        </div>
        <Carousel />
        <Calendar/>
    </div>
  );
}
}

export default Dashboard;
