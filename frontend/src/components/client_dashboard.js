import React, { useState, useEffect } from 'react';
import './client_dashboard.css'
import qu from "../images/quote.svg"
import phone from "../images/phone.svg"
import course from "../images/course.svg"
import arrow from "../images/arrow.svg"
import happy from "../images/happy.svg"
import moderate from "../images/moderate.svg"
import extreme from "../images/extreme.svg"
import { useNavigate } from 'react-router-dom';
import fire from "../images/fire.svg";
import volume from "../images/volume.svg";
import mic from "../images/mic.svg";
import dailyActivities from './daily_activities';
import NavbarClient from './client_navbar';
import axios from "axios";

function Quote() {
  const navigate = useNavigate();
  const [quote, setQuote] = useState('');
  const [firstName, setFirstName] = useState("");
  const [activeCourse, setCourse] = useState("")
  const [hasCourse, setHasCourse] = useState(true); 
  let [coachName, setCoach] = useState("")
  const [hasMeeting, setMeeting] = useState(true)
  const [time, setTime] = useState()
  const [countdown, setCountdown] = useState({});
  const email = localStorage.getItem("email")

  useEffect(() => {
    const fetchData = async function () {
      let result = await axios.get("http://api.quotable.io/random");
      setQuote(result.data.content);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async function () {
      let toSend = { email: localStorage.getItem("email") };
      let result2 = await axios.post(
        "http://localhost:4000/client/getClientDashboardDetails",
        toSend
      );
      console.log(result2.data)
      setFirstName(result2.data.firstName);
      setCourse(result2.data.currentActiveCourse); 
      if(activeCourse.length == 0){
        setHasCourse(false); 
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async function () {
      let toSend = { email: localStorage.getItem("email") };
      let result2 = await axios.post(
        "http://localhost:4000/client/getMeetings",
        toSend
      );
      if (!(result2.data)){
        setMeeting(false);
      }
      else{
        setMeeting(true);
        setCoach(result2.data.name);
        setTime(new Date(result2.data.time));
      } 
    };
    fetchData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (time) {
        const now = new Date().getTime();
        const distance = time.getTime() - now;

        if (distance > 0) {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          setCountdown({ days, hours, minutes, seconds });
        } else {
          clearInterval(intervalId);
        }
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time]);

  const NoStuttering = function(){
    const divNoStuttering = document.querySelector(".circleBack");
    if (divNoStuttering) {
      divNoStuttering.style.backgroundColor = "#F2F2F2";
    } else {
      console.log("div not found")
    }
    const divModerate = document.querySelector(".circleBack2");
    if (divModerate) {
      divModerate.style.backgroundColor = "#71A7F140";
    } else {
      console.log("div not found");
    }

    const divExtreme = document.querySelector(".circleBack3");
    if (divExtreme) {
      divExtreme.style.backgroundColor = "#71A7F140";
    } else {
      console.log("div not found")
    }
  }

const Moderate =  function(){
  const div = document.querySelector(".circleBack2");
  if (div) {
    div.style.backgroundColor = "#F2F2F2";
  } else {
    console.log("div not found")
  }
  const divNoStuttering = document.querySelector(".circleBack");
  if (divNoStuttering) {
    divNoStuttering.style.backgroundColor = "#71A7F140";
  } else {
    console.log("div not found")
  }

  const divExtreme = document.querySelector(".circleBack3");
  if (divExtreme) {
    divExtreme.style.backgroundColor = "#71A7F140";
  } else {
    console.log("div not found")
  }
}

const Extreme =  function(){
  const div = document.querySelector(".circleBack3");
  if (div) {
    div.style.backgroundColor = "#F2F2F2";
  } else {
    console.log("div not found")
  }
  const divNoStuttering = document.querySelector(".circleBack");
  if (divNoStuttering) {
    divNoStuttering.style.backgroundColor = "#71A7F140";
  } else {
    console.log("div not found")
  }

  const divModerate = document.querySelector(".circleBack2");
  if (divModerate) {
    divModerate.style.backgroundColor = "#71A7F140";
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
    <div className="client-bg">
      <NavbarClient/>
      <div className='mainwelcome'>
        <h6 className='welcome'>{firstName}'s Dashboard</h6>
      </div>
        <div className="quoteback">
        <img className="qu"src={qu}/>
        <h6 className='top1'>Strength Statements</h6>
        <p className='text1'>{quote}</p>  
        </div>
       
        <div className='log'>
        <p className='logtext1'> How was your stuttering today?</p>
          <div className='circleBack'></div>
          <img className='happy'src={happy} onClick={NoStuttering}/> 
       
        <div className='circleBack2'></div>
        <img className='meh'src={moderate} onClick={Moderate}/>

        <div className='circleBack3'></div>
        <img className='sad'src={extreme} onClick={Extreme}/>

        </div>
        <p className='support1'>Guided Speech Support</p>
        <div className='gbox1'>  
        <img className='phone'src={phone}/>
        {hasMeeting ? (
        <div>
          <h6 className='subtext'>Coaching with {coachName} in</h6>
          {countdown.days && (
            <p className='timer'>
              {countdown.days}d {countdown.hours}h {countdown.minutes}m{" "}
              {countdown.seconds}s
            </p>
          )}
        </div>
      ) : (
        <h6 className='subtext'>No Upcoming Meetings</h6>
      )}
        {/* {hasMeeting ? <h6 className='subtext'>Coaching with {coachName} in</h6> : <h6 className='subtext'>No Upcoming Meetings</h6>} */}
       
        <h6 className='detail'>Meetings</h6>
        </div>

        <div className='gbox2' onClick={() => {navigate('/client/courses')}}>  
        <img className='course'src={course}/>
        {hasCourse ? <h6 className='subtext'>{activeCourse}</h6> : <h6 className='subtext'>Buy Courses</h6>}
        <h6 className='detail'>Courses</h6>
        <img className='arrow'src={arrow}/>
        </div>

        <div>
          <div className='dailyTasks' onClick={() => {navigate('/client/dailyActivities')}}>
            <div className='rectangle'></div>
            <h6 className='activitytext'>Daily Activities</h6>
            <img className='icon'src={fire}></img>
            <a href='dailyActivities'><img className='arrow2'src={arrow}/></a>
          </div>

         <div className='speechTechniques' onClick={() => {navigate('/client/speechTechniques')}}>
          <div className='rectangle2'></div>
          <h6 className='activitytext'>Speech Techniques</h6>
          <img className='icon'src={volume}></img>
          <a href='speechTechniques'><img className='arrow2'src={arrow}/></a> 
          </div>

          <div className='quickPractice' onClick={() => {navigate('/client/quickPractice')}}>
          <div className='rectangle2'></div>
          <h6 className='activitytext'>Quick Practice</h6>
          <img className='icon'src={mic}></img>
          <a href='quickPractice'><img className='arrow2'src={arrow}/></a>
          {/* <h6 className='progress'>View Progress</h6> */}
          </div>
        </div>

    </div>
  );
}}

export default Quote;
